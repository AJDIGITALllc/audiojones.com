import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Handles POST requests to /api/stripe/checkout.
 * This function creates a Stripe Checkout session.
 * @param {NextRequest} req - The request object.
 * @returns {Promise<NextResponse>} A promise that resolves to the response.
 */
export async function POST(req: NextRequest) {
  const stripeSecret = process.env.stripe_secret;
  if (!stripeSecret) return NextResponse.json({ error: "Missing stripe_secret" }, { status: 500 });
  const stripe = new Stripe(stripeSecret);

  const { priceId, uid, success_url, cancel_url } = await req.json();
  if (!priceId || !success_url || !cancel_url) return NextResponse.json({ error: "Missing params" }, { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url,
    cancel_url,
    metadata: { uid: uid || "" },
  });
  return NextResponse.json({ url: session.url });
}
