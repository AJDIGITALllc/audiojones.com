export const runtime = 'nodejs';
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripeSecret = process.env.stripe_secret;
  if (!stripeSecret) {
    return NextResponse.json({ error: "Missing stripe_secret" }, { status: 500 });
  }

  // Long-term safe Stripe initialization
  // Do NOT hardcode apiVersion - let SDK use account default
  const opts: Stripe.StripeConfig = {};
  const envApiVersion = process.env.STRIPE_API_VERSION;
  if (envApiVersion) {
    // Only enable if explicitly configured; otherwise omit to use account default
    opts.apiVersion = envApiVersion as Stripe.LatestApiVersion;
  }

  const stripe = new Stripe(stripeSecret, opts);

  const { priceId, uid, success_url, cancel_url } = await req.json();
  if (!priceId || !success_url || !cancel_url) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url,
    cancel_url,
    metadata: uid ? { uid } : undefined,
  });

  return NextResponse.json({ id: session.id, url: session.url });
}
