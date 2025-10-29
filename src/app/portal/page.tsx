"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";
import { executeN8nWebhook, executeN8nWorkflow } from "@/lib/client/n8n";

export default function PortalOverview() {
  const { show } = useToast();
  const [webhookPath, setWebhookPath] = useState("/aj-test");
  const [workflowId, setWorkflowId] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const samplePayload = { source: "portal-demo", ts: Date.now() };

  async function runWebhook() {
    try {
      setLoading("webhook");
      const r = await executeN8nWebhook(webhookPath, samplePayload, true);
      show({ title: "n8n Webhook Triggered", description: "Test webhook sent", variant: "success" });
      // eslint-disable-next-line no-console
      console.log("n8n webhook result", r);
    } catch (e: any) {
      show({ title: "n8n Webhook Failed", description: e?.message || "Error", variant: "error" });
    } finally {
      setLoading(null);
    }
  }

  async function runWorkflow() {
    try {
      setLoading("workflow");
      const r = await executeN8nWorkflow(workflowId, samplePayload);
      show({ title: "n8n Workflow Run", description: "Workflow executed", variant: "success" });
      // eslint-disable-next-line no-console
      console.log("n8n workflow result", r);
    } catch (e: any) {
      show({ title: "n8n Workflow Failed", description: e?.message || "Error", variant: "error" });
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="text-white/90 space-y-6">
      <div>Client overview. Wire Firestore reads here.</div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-bold mb-3">n8n Test Triggers</h3>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={webhookPath}
            onChange={(e) => setWebhookPath(e.target.value)}
            className="flex-1 min-w-0 rounded-full bg-white/10 border border-white/20 px-4 py-2 placeholder-white/40 focus:outline-none"
            placeholder="/your-webhook-path"
          />
          <button
            onClick={runWebhook}
            disabled={loading === "webhook"}
            className="rounded-full px-4 py-2 font-semibold border border-white/20 hover:bg-white/10 disabled:opacity-60"
          >
            {loading === "webhook" ? "Sending..." : "Send Webhook (test)"}
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={workflowId}
            onChange={(e) => setWorkflowId(e.target.value)}
            className="flex-1 min-w-0 rounded-full bg-white/10 border border-white/20 px-4 py-2 placeholder-white/40 focus:outline-none"
            placeholder="workflow-id"
          />
          <button
            onClick={runWorkflow}
            disabled={!workflowId || loading === "workflow"}
            className="rounded-full px-4 py-2 font-semibold gradient-bg text-black disabled:opacity-60"
          >
            {loading === "workflow" ? "Running..." : "Run Workflow"}
          </button>
        </div>
        <p className="mt-3 text-sm text-white/60">Configure `N8N_API_BASE` and `N8N_WEBHOOK_BASE` in your env.</p>
      </div>
    </div>
  );
}
