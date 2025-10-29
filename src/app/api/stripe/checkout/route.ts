import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const stripeSecret = process.env.stripe_secret;
  if (!stripeSecret) {
    return NextResponse.json({ error: "Missing stripe_secret" }, { status: 500 });
  }

  // Use a compatible apiVersion type assertion to satisfy TS
  const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" as any });

  const { priceId, uid, success_url, cancel_url } = await req.json();
  if (!priceId || !success_url || !cancel_url) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url,
    cancel_url,
    client_reference_id: uid ?? undefined,
  });

  return NextResponse.json({ id: session.id, url: session.url });
}
