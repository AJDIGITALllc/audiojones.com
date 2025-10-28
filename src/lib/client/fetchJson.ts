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

export type RetryOptions = {
  retries?: number; // default 2
  retryDelayBaseMs?: number; // default 400
  isRetryable?: (res: FetchJsonResult) => boolean; // default: network or 5xx
};

export async function fetchJsonRetry<T = any>(
  url: string,
  init?: RequestInit,
  retry?: RetryOptions
): Promise<FetchJsonResult<T>> {
  const cfg: Required<RetryOptions> = {
    retries: retry?.retries ?? 2,
    retryDelayBaseMs: retry?.retryDelayBaseMs ?? 400,
    isRetryable: retry?.isRetryable ?? ((r) => !r.ok && (r.status === 0 || (r.status >= 500 && r.status <= 599))),
  };
  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = await fetchJson<T>(url, init);
    if (!cfg.isRetryable(res) || attempt >= cfg.retries) return res;
    const wait = cfg.retryDelayBaseMs * Math.pow(2, attempt);
    await new Promise((r) => setTimeout(r, wait));
    attempt++;
  }
}

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

export async function fetchJsonWithToastRetry<T = any>(
  url: string,
  init: RequestInit | undefined,
  toast: ToastLike,
  opts?: { success?: { title?: string; description?: string }; failure?: { title?: string; description?: string }; retry?: RetryOptions }
): Promise<FetchJsonResult<T>> {
  const res = await fetchJsonRetry<T>(url, init, opts?.retry);
  if (res.ok) {
    if (opts?.success) toast.show({ variant: "success", ...opts.success });
  } else {
    toast.show({ variant: "error", title: opts?.failure?.title || "Request failed", description: opts?.failure?.description || res.error });
  }
  return res;
}
