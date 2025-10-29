"use client";

/**
 * The result of a fetchJson call.
 */
export type FetchJsonResult<T = any> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
  response?: Response;
};

/**
 * Fetches JSON from a URL and returns a standardized result object.
 * @param {string} url - The URL to fetch.
 * @param {RequestInit} [init] - The request initialization options.
 * @returns {Promise<FetchJsonResult<T>>} A promise that resolves to the result object.
 */
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
  } catch (e: unknown) {
    return { ok: false, status: 0, error: e?.message || "Network error" };
  }
}

/**
 * An object that can show a toast notification.
 */
export type ToastLike = { show: (o: { title?: string; description?: string; variant?: "success" | "error" | "info"; duration?: number }) => void };

/**
 * Options for retrying a fetch request.
 */
export type RetryOptions = {
  retries?: number; // default 2
  retryDelayBaseMs?: number; // default 400
  isRetryable?: (res: FetchJsonResult) => boolean; // default: network or 5xx
};

/**
 * Fetches JSON from a URL with automatic retries on failure.
 * @param {string} url - The URL to fetch.
 * @param {RequestInit} [init] - The request initialization options.
 * @param {RetryOptions} [retry] - The retry options.
 * @returns {Promise<FetchJsonResult<T>>} A promise that resolves to the result object.
 */
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

  while (true) {
    const res = await fetchJson<T>(url, init);
    if (!cfg.isRetryable(res) || attempt >= cfg.retries) return res;
    const wait = cfg.retryDelayBaseMs * Math.pow(2, attempt);
    await new Promise((r) => setTimeout(r, wait));
    attempt++;
  }
}

/**
 * Fetches JSON from a URL and shows a toast notification on success or failure.
 * @param {string} url - The URL to fetch.
 * @param {RequestInit | undefined} init - The request initialization options.
 * @param {ToastLike} toast - The toast object.
 * @param {{ success?: { title?: string; description?: string }; failure?: { title?: string; description?: string } }} [opts] - The toast options.
 * @returns {Promise<FetchJsonResult<T>>} A promise that resolves to the result object.
 */
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

/**
 * Fetches JSON from a URL with automatic retries and shows a toast notification on success or failure.
 * @param {string} url - The URL to fetch.
 * @param {RequestInit | undefined} init - The request initialization options.
 * @param {ToastLike} toast - The toast object.
 * @param {{ success?: { title?: string; description?: string }; failure?: { title?: string; description?: string }; retry?: RetryOptions }} [opts] - The toast and retry options.
 * @returns {Promise<FetchJsonResult<T>>} A promise that resolves to the result object.
 */
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
