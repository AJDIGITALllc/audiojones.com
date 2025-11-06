import { NextRequest, NextResponse } from "next/server";
import mappings from "@/config/automation-mappings.json";
import { upsertMailerLiteSubscriber } from "@/lib/integrations/mailerlite";

interface WhopWebhookData {
  event: string;
  data: {
    email: string;
    product_id: string;
    name?: string;
  };
}

export async function POST(req: NextRequest) {
  // Verify webhook signature
  const secret = process.env.WHOP_WEBHOOK_SECRET;
  const sig = req.headers.get("x-whop-signature");

  if (secret && sig !== secret) {
    console.log('[whop-webhook] Invalid signature');
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Parse request body
  const body: WhopWebhookData = await req.json().catch(() => null);
  if (!body) {
    console.log('[whop-webhook] Invalid JSON body');
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const email = body?.data?.email;
  const productId = body?.data?.product_id;
  const name = body?.data?.name ?? "";

  console.log('[whop-webhook] Received:', { 
    event: body.event, 
    email, 
    productId, 
    name 
  });

  // Find product mapping
  const match = Array.isArray(mappings)
    ? mappings.find((p) => p.whopProductId === productId)
    : null;

  if (!match) {
    console.log("[whop-webhook] unmapped product", productId);
    return NextResponse.json({ ok: true, unmapped: true });
  }

  if (!email) {
    console.log("[whop-webhook] missing email", body);
    return NextResponse.json({ ok: true, missingEmail: true });
  }

  // Process the automation
  await upsertMailerLiteSubscriber({
    email,
    name,
    tag: match.mailerliteTag,
  });

  console.log('[whop-webhook] Processed successfully:', {
    email,
    productId,
    tag: match.mailerliteTag,
    epmStage: match.epmStage
  });

  return NextResponse.json({ 
    ok: true,
    processed: {
      email,
      productId,
      tag: match.mailerliteTag,
      epmStage: match.epmStage
    }
  });
}