import { NextRequest, NextResponse } from "next/server";
import mappings from "@/config/automation-mappings.json";
import { upsertMailerLiteSubscriber } from "@/lib/integrations/mailerlite";
import { mapWhopPlanToInternal } from "@/lib/capacity";
import { db } from "@/lib/server/firebaseAdmin";

interface WhopWebhookData {
  event: string;
  data: {
    email: string;
    product_id: string;
    name?: string;
    amount?: number;
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

  // Map Whop data to client contract
  const contractMapping = mapWhopPlanToInternal(body.data);
  const contractId = `whop-${productId}-${email.replace('@', '-at-')}`;

  // Determine contract status based on event type
  let contractStatus = 'active';
  if (body.event?.includes('cancel') || body.event?.includes('expire')) {
    contractStatus = 'offboarding';
  } else if (body.event?.includes('renew')) {
    contractStatus = 'pending_renewal';
  }

  // Upsert client contract for capacity management
  try {
    await db.collection("client_contracts").doc(contractId).set({
      client_id: email,
      whop_product_id: productId,
      plan_tier: contractMapping.plan_tier,
      plan_type: contractMapping.plan_type,
      monthly_fee: body.data?.amount || 5000, // Default if not provided
      hours_committed: contractMapping.hours_committed,
      status: contractStatus,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      source: 'whop_webhook',
      whop_event: body.event,
      client_name: name || email
    }, { merge: true });

    console.log(`[whop-webhook] Updated client contract: ${contractId} (${contractMapping.plan_tier})`);
  } catch (error) {
    console.error('[whop-webhook] Failed to update client contract:', error);
    // Don't fail the webhook for this - just log it
  }

  console.log('[whop-webhook] Processed successfully:', {
    email,
    productId,
    tag: match.mailerliteTag,
    epmStage: match.epmStage,
    contractId,
    contractStatus
  });

  return NextResponse.json({ 
    ok: true,
    processed: {
      email,
      productId,
      tag: match.mailerliteTag,
      epmStage: match.epmStage,
      client_contract: {
        id: contractId,
        plan_tier: contractMapping.plan_tier,
        plan_type: contractMapping.plan_type,
        status: contractStatus
      }
    }
  });
}