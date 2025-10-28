"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ToastItem = {
  id: string;
  title?: string;
  description?: string;
  variant?: "success" | "error" | "info";
  duration?: number;
};

type ToastContextValue = {
  show: (t: Omit<ToastItem, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((t: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    const item: ToastItem = { id, duration: 3000, variant: "info", ...t };
    setToasts((prev) => [...prev, item]);
    const timeout = setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
      clearTimeout(timeout);
    }, item.duration);
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster toasts={toasts} onClose={(id) => setToasts((prev) => prev.filter((x) => x.id !== id))} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function Toaster({ toasts, onClose }: { toasts: ToastItem[]; onClose: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-[1000] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`min-w-[240px] max-w-xs rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm text-sm ${
            t.variant === "success"
              ? "bg-emerald-500/15 border-emerald-400/25 text-emerald-200"
              : t.variant === "error"
              ? "bg-red-500/15 border-red-400/25 text-red-200"
              : "bg-white/10 border-white/20 text-white/90"
          }`}
          role="status"
          aria-live="polite"
        >
          {t.title && <div className="font-semibold mb-0.5">{t.title}</div>}
          {t.description && <div className="opacity-90">{t.description}</div>}
          <button className="absolute right-2 top-2 opacity-70 hover:opacity-100" onClick={() => onClose(t.id)} aria-label="Dismiss">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

