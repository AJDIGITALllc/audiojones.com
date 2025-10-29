"use client";

import { auth } from "@/lib/firebase/client";
import { fetchJson, fetchJsonWithToast, fetchJsonRetry, fetchJsonWithToastRetry, type FetchJsonResult, type ToastLike, type RetryOptions } from "@/lib/client/fetchJson";

type UseApiOptions = {
  toast?: ToastLike;
};

/**
 * A hook for making authenticated API requests.
 * It automatically adds the user's ID token to the request headers.
 * @param {UseApiOptions} [opts] - The options for the hook.
 * @returns {{ getJson: <T = any>(url: string, toast?: { success?: { title?: string; description?: string }; failure?: { title?: string; description?: string }; retry?: RetryOptions }) => Promise<FetchJsonResult<T>>, postJson: <T = any>(url: string, body: unknown, toast?: { success?: { title?: string; description?: string }; failure?: { title?: string; description?: string }; retry?: RetryOptions }) => Promise<FetchJsonResult<T>>, withAuth: <T = any>(url: string, init?: RequestInit, toast?: { success?: { title?: string; description?: string }; failure?: { title?: string; description?: string }; retry?: RetryOptions }) => Promise<FetchJsonResult<T>> }} An object with methods for making API requests.
 */
export function useApi(opts?: UseApiOptions) {
  /**
   *
   */
  async function withAuth<T = any>(url: string, init?: RequestInit, toast?: { success?: { title?: string; description?: string }; failure?: { title?: string; description?: string }; retry?: RetryOptions }): Promise<FetchJsonResult<T>> {
    const token = await auth.currentUser?.getIdToken();
    const headers = new Headers(init?.headers || {});
    if (token) headers.set("authorization", `Bearer ${token}`);
    const next: RequestInit = { ...init, headers };
    if (opts?.toast) return fetchJsonWithToastRetry<T>(url, next, opts.toast, toast);
    return fetchJsonRetry<T>(url, next, toast?.retry);
  }

  return {
    /**
     *
     */
    getJson: <T = any>(url: string, toast?: { success?: { title?: string; description?: string }; failure?: { title?: string; description?: string }; retry?: RetryOptions }) => withAuth<T>(url, { method: "GET", cache: "no-store" }, toast),
    /**
     *
     */
    postJson: <T = any>(url: string, body: unknown, toast?: { success?: { title?: string; description?: string }; failure?: { title?: string; description?: string }; retry?: RetryOptions }) => withAuth<T>(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }, toast),
    withAuth,
  };
}
