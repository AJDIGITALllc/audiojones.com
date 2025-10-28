"use client";

import { auth } from "@/lib/firebase/client";
import { fetchJson, fetchJsonWithToast, type FetchJsonResult, type ToastLike } from "@/lib/client/fetchJson";

type UseApiOptions = {
  toast?: ToastLike;
};

export function useApi(opts?: UseApiOptions) {
  async function withAuth<T = any>(url: string, init?: RequestInit, toast?: { success?: { title?: string; description?: string }; failure?: { title?: string; description?: string } }): Promise<FetchJsonResult<T>> {
    const token = await auth.currentUser?.getIdToken();
    const headers = new Headers(init?.headers || {});
    if (token) headers.set("authorization", `Bearer ${token}`);
    const next: RequestInit = { ...init, headers };
    if (opts?.toast) return fetchJsonWithToast<T>(url, next, opts.toast, toast);
    return fetchJson<T>(url, next);
  }

  return {
    getJson: <T = any>(url: string, toast?: { success?: { title?: string; description?: string }; failure?: { title?: string; description?: string } }) => withAuth<T>(url, { method: "GET", cache: "no-store" }, toast),
    postJson: <T = any>(url: string, body: any, toast?: { success?: { title?: string; description?: string }; failure?: { title?: string; description?: string } }) => withAuth<T>(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }, toast),
    withAuth,
  };
}

