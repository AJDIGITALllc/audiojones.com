"use client";

export type FetchJsonResult<T = any> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
  response?: Response;
};

export async function fetchJson<T = any>(url: string, init?: RequestInit): Promise<FetchJsonResult<T>> {
  try {
    const res = await fetch(url, init);
    const ct = res.headers.get("content-type") || "";
    const body = ct.includes("application/json") ? await res.json().catch(() => ({})) : await res.text();
    if (!res.ok) {
      const msg = (body && (body.error || body.message)) || res.statusText || "Request failed";
      return { ok: false, status: res.status, error: String(msg), response: res };
    }
    return { ok: true, status: res.status, data: body as T, response: res };
  } catch (e: any) {
    return { ok: false, status: 0, error: e?.message || "Network error" };
  }
}

export type ToastLike = { show: (o: { title?: string; description?: string; variant?: "success" | "error" | "info"; duration?: number }) => void };

export async function fetchJsonWithToast<T = any>(
  url: string,
  init: RequestInit | undefined,
  toast: ToastLike,
  opts?: { success?: { title?: string; description?: string }; failure?: { title?: string; description?: string } }
): Promise<FetchJsonResult<T>> {
  const res = await fetchJson<T>(url, init);
  if (res.ok) {
    if (opts?.success) toast.show({ variant: "success", ...opts.success });
  } else {
    toast.show({ variant: "error", title: opts?.failure?.title || "Request failed", description: opts?.failure?.description || res.error });
  }
  return res;
}

