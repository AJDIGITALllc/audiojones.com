export const runtime = 'nodejs';
import { NextRequest, NextResponse } from "next/server";
import { n8nRunWorkflow, n8nWebhook } from "@/lib/server/n8n";

type Body = {
  mode?: "workflow" | "webhook";
  workflowId?: string;
  path?: string; // webhook path
  payload?: any;
  test?: boolean; // webhook-test if true
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;
    const mode = body.mode || (body.workflowId ? "workflow" : "webhook");

    if (mode === "workflow") {
      if (!body.workflowId) return NextResponse.json({ error: "workflowId required" }, { status: 400 });
      const result = await n8nRunWorkflow(body.workflowId, body.payload);
      return NextResponse.json({ ok: true, mode, result });
    }

    // webhook mode
    if (!body.path) return NextResponse.json({ error: "path required for webhook mode" }, { status: 400 });
    const result = await n8nWebhook(body.path, body.payload, { test: !!body.test });
    return NextResponse.json({ ok: true, mode, result });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "n8n execute failed" }, { status: 500 });
  }
}

