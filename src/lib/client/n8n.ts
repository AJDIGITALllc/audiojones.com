export type ExecuteResult = { ok: boolean; [k: string]: any };

async function post<T = ExecuteResult>(body: any): Promise<T> {
  const res = await fetch("/api/n8n/execute", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "n8n execute failed");
  return data as T;
}

export async function executeN8nWebhook(path: string, payload?: any, test?: boolean) {
  if (!path) throw new Error("path required");
  return post({ mode: "webhook", path, payload, test: !!test });
}

export async function executeN8nWorkflow(workflowId: string, payload?: any) {
  if (!workflowId) throw new Error("workflowId required");
  return post({ mode: "workflow", workflowId, payload });
}

