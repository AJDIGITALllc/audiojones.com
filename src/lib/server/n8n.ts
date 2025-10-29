import { NextResponse } from "next/server";

function getBase(): string {
  const base = process.env.N8N_API_BASE || process.env.N8N_BASE_URL;
  if (base) return base.replace(/\/$/, "");
  return "http://localhost:5678/api/v1";
}

function getKey(): string | undefined {
  return process.env.N8N_API_KEY;
}

export async function n8nRequest<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const key = getKey();
  if (!key) throw new Error("Missing N8N_API_KEY");
  const base = getBase();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = new Headers(init.headers);
  headers.set("X-N8N-API-KEY", key);
  headers.set("accept", "application/json");

  const res = await fetch(url, { ...init, headers, cache: "no-store" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `n8n error: ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function n8nMe() {
  return n8nRequest("/me");
}

function getWebhookBase(): string {
  const explicit = process.env.N8N_WEBHOOK_BASE;
  if (explicit) return explicit.replace(/\/$/, "");
  const api = process.env.N8N_API_BASE || process.env.N8N_BASE_URL || "http://localhost:5678/api/v1";
  try {
    const u = new URL(api);
    return `${u.protocol}//${u.host}`;
  } catch {
    return "http://localhost:5678";
  }
}

export async function n8nWebhook<T = any>(path: string, payload?: any, opts?: { test?: boolean; headers?: Record<string, string> }) {
  if (!process.env.N8N_API_KEY) throw new Error("Missing N8N_API_KEY");
  const base = getWebhookBase();
  const prefix = opts?.test ? "/webhook-test" : "/webhook";
  const url = `${base}${prefix}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = new Headers(opts?.headers);
  headers.set("X-N8N-API-KEY", process.env.N8N_API_KEY!);
  headers.set("content-type", "application/json");
  headers.set("accept", "application/json");
  const res = await fetch(url, { method: "POST", headers, body: payload ? JSON.stringify(payload) : undefined, cache: "no-store" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `n8n webhook error: ${res.status}`);
  }
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return (await res.json()) as T;
  // Fallback for non-JSON webhook responses
  return (await res.text()) as unknown as T;
}

export async function n8nRunWorkflow<T = any>(workflowId: string, payload?: any) {
  if (!workflowId) throw new Error("workflowId required");
  return n8nRequest<T>(`/workflows/${encodeURIComponent(workflowId)}/run`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload ? JSON.stringify(payload) : undefined,
  });
}
