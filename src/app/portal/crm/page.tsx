"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";
import { useApi } from "@/lib/client/useApi";
import { useRequireAuth } from "@/lib/client/useRequireAuth";

type WhopCustomer = {
  id: string;
  email?: string;
  name?: string;
  status?: string;
  plan_name?: string;
};

/**
 * Renders the CRM page, which displays a list of customers from Whop.
 * This component is only accessible to admin users.
 * @returns {JSX.Element} The CRM page component.
 */
export default function CRMPage() {
  useRequireAuth({ redirectTo: "/portal", requireAdmin: true });
  const [rows, setRows] = useState<WhopCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { show } = useToast();
  const api = useApi({ toast: { show } });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.getJson<{ data: WhopCustomer[] }>("/api/whop/customers", { failure: { title: "CRM load failed" } });
        if (!res.ok) throw new Error(res.error);
        setRows(res.data?.data || []);
      } catch (e: unknown) {
        const msg = e?.message || "Error fetching customers";
        setError(msg);
        show({ title: "CRM load failed", description: msg, variant: "error" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">CRM (Whop)</h1>
      {loading && <p className="text-white/70">Loading customers…</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && (
        rows.length === 0 ? (
          <p className="text-white/70">No customers found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rows.map((c) => (
              <div key={c.id} className="border border-white/10 rounded-xl p-4 bg-white/5">
                <p className="font-semibold text-white/90">{c.name || "Unnamed"}</p>
                <p className="text-sm text-white/70">{c.email || "—"}</p>
                <p className="mt-2 text-sm">Plan: <span className="text-white/90">{c.plan_name || "—"}</span></p>
                <p className="text-xs text-white/60">Status: {c.status || "—"}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
