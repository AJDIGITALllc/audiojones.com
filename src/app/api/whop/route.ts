// src/app/api/whop/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getTierByBillingSku } from "@/lib/getPricing";

// ⬇️ optional: if you installed @whop/sdk
// import Whop from "@whop/sdk";

// ─────────────────────────────────────────────
// Firebase Admin init (server-only)
// Requires env:
// FIREBASE_PROJECT_ID
// FIREBASE_CLIENT_EMAIL
// FIREBASE_PRIVATE_KEY  (with \n)
// ─────────────────────────────────────────────
function getFirebaseApp(): App {
  if (getApps().length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
      console.warn("[whop webhook] Firebase env vars missing – will still respond 200 but not write to Firestore.");
      return initializeApp(); // init with default (will fail on write if no creds)
    }

    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }
  return getApps()[0]!;
}

// ─────────────────────────────────────────────
// (optional) Whop client helper
// If you want to re-fetch payment/invoice from Whop
// ─────────────────────────────────────────────
async function fetchWhopResource(kind: "payment" | "invoice", id: string) {
  const whopAppId = process.env.WHOP_APP_ID;
  const whopApiKey = process.env.WHOP_API_KEY;

  if (!whopAppId || !whopApiKey) {
    console.warn("[whop webhook] WHOP_APP_ID / WHOP_API_KEY missing, skipping re-fetch");
    return null;
  }

  // minimal fetch using fetch() so you don't have to install SDK
  const url =
    kind === "payment"
      ? `https://api.whop.com/api/v1/payments/${id}`
      : `https://api.whop.com/api/v1/invoices/${id}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${whopApiKey}`,
      "Content-Type": "application/json",
      "X-Whop-App-Id": whopAppId,
    },
  });

  if (!res.ok) {
    console.warn(`[whop webhook] failed to refetch ${kind} ${id}`, await res.text());
    return null;
  }
  return res.json();
}

// ─────────────────────────────────────────────
// GET = health check
// ─────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({ ok: true, source: "whop-webhook" });
}

// ─────────────────────────────────────────────
// POST = main webhook
// handles:
// 1) legacy/simple payloads: { user: {email}, product_id/billing_sku/... }
// 2) event-based payloads: { type: "payment.succeeded", data: {...} }
// ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);

  if (!json) {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Optional: verify Whop webhook signature here (json + headers)
  // const signature = req.headers.get("webhook-signature");
  // const ts = req.headers.get("webhook-timestamp");
  // TODO: verify with Whop's secret

  const app = getFirebaseApp();
  const db = getFirestore(app);

  // Branch 1: event-style payloads from the Whop docs (have "type")
  if (typeof json.type === "string") {
    const eventType = json.type as string;
    const eventId = json.id as string | undefined;
    const ts = json.timestamp as string | undefined;

    // We'll keep what Whop sent
    const rawData = json.data || {};

    // decide if we want to re-fetch
    let enriched: any = null;
    if (eventType.startsWith("payment.") && rawData.id) {
      enriched = await fetchWhopResource("payment", rawData.id).catch(() => null);
    } else if (eventType.startsWith("invoice.") && rawData.id) {
      enriched = await fetchWhopResource("invoice", rawData.id).catch(() => null);
    }

    // figure out email / user from whatever we have
    const email =
      enriched?.user?.email ||
      rawData?.user?.email ||
      rawData?.billing_address?.email_address ||
      null;

    // try to map SKU/product → your service
    // payments usually have product / plan
    const possibleSku =
      enriched?.product?.id ||
      enriched?.plan?.id ||
      rawData?.product?.id ||
      rawData?.plan?.id ||
      rawData?.billing_sku ||
      null;

    let pricingMatch: any = null;
    if (possibleSku) {
      pricingMatch = getTierByBillingSku(possibleSku);
    }

    // write to Firestore (best-effort)
    try {
      // 1) event log
      await db.collection("subscription_events").add({
        whop_event_id: eventId,
        type: eventType,
        received_at: new Date().toISOString(),
        email,
        sku: possibleSku,
        pricing_match: pricingMatch || null,
        whop_payload: json,
        enriched,
      });

      // 2) upsert customer if we have an email
      if (email) {
        const customerRef = db.collection("customers").doc(email);
        await customerRef.set(
          {
            email,
            last_whop_event: eventType,
            last_whop_event_at: ts || new Date().toISOString(),
            last_sku: possibleSku || null,
            service_id: pricingMatch?.service?.id || null,
            tier_id: pricingMatch?.tier?.id || null,
            status:
              eventType === "payment.succeeded" || eventType === "invoice.paid"
                ? "active"
                : "updated",
            updated_at: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.error("[whop webhook] Firestore write failed", err);
      // we still return 200 so Whop doesn't retry forever
    }

    return NextResponse.json({
      ok: true,
      mode: "event",
      eventType,
      email,
      sku: possibleSku,
      pricingMatch: pricingMatch || null,
    });
  }

  // ─────────────────────────────────────────
  // Branch 2: your earlier "simple webhook" style
  // where we just get { user: { email }, product_id / plan_id / billing_sku ... }
  // ─────────────────────────────────────────
  const email =
    json.user?.email ||
    json.customer?.email ||
    json.email ||
    null;

  const sku =
    json.billing_sku ||
    json.product_id ||
    json.plan_id ||
    json.sku ||
    null;

  let pricingMatch: any = null;
  if (sku) {
    pricingMatch = getTierByBillingSku(sku);
  }

  try {
    // event log
    await db.collection("subscription_events").add({
      type: "subscription_created",
      received_at: new Date().toISOString(),
      email,
      sku,
      pricing_match: pricingMatch || null,
      whop_payload: json,
    });

    // upsert customer
    if (email) {
      const customerRef = db.collection("customers").doc(email);
      await customerRef.set(
        {
          email,
          status: "active",
          last_sku: sku,
          service_id: pricingMatch?.service?.id || null,
          tier_id: pricingMatch?.tier?.id || null,
          billing_sku: sku,
          updated_at: new Date().toISOString(),
        },
        { merge: true }
      );
    }
  } catch (err) {
    console.error("[whop webhook] Firestore write failed", err);
  }

  return NextResponse.json({
    ok: true,
    mode: "simple",
    email,
    sku,
    pricingMatch: pricingMatch || null,
  });
}