import { NextRequest, NextResponse } from "next/server";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getTierByBillingSku } from "@/lib/getPricing";

if (!getApps().length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    console.warn("Firebase admin env vars missing");
  } else {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }
}

const db = getFirestore();

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const email =
    body?.user?.email ||
    body?.customer?.email ||
    body?.email ||
    null;

  const sku =
    body?.billing_sku ||
    body?.product_id ||
    body?.plan_id ||
    null;

  if (!sku) {
    return NextResponse.json({ ok: false, error: "missing sku" }, { status: 400 });
  }

  const match = getTierByBillingSku(sku);

  // log always
  await db.collection("logs").add({
    source: "whop",
    received_at: new Date().toISOString(),
    payload: body,
    matched: !!match,
  });

  if (!match) {
    return NextResponse.json({ ok: true, warning: "sku not mapped" });
  }

  const clientId = email ? `email:${email}` : `whop:${body?.user_id || "unknown"}`;
  await db.collection("customers").doc(clientId).set(
    {
      email,
      whop_customer_id: body?.customer_id || null,
      service_id: match.service.id,
      tier_id: match.tier.id,
      billing_sku: sku,
      status: "active",
      updated_at: new Date().toISOString(),
    },
    { merge: true }
  );

  await db.collection("subscription_events").add({
    customer_id: clientId,
    event_type: "subscription.synced",
    service_id: match.service.id,
    billing_sku: sku,
    webhook_payload: body,
    processed_at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, match });
}