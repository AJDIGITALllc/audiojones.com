import * as admin from "firebase-admin";
import * as f from "firebase-functions";
import Stripe from "stripe";
import fetch from "node-fetch";

admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

// Stripe
const stripeSecret = process.env.stripe_secret as string | undefined;
const stripeWebhookSecret = process.env.stripe_webhook_secret as string | undefined;
const stripe = new Stripe(stripeSecret || "", { apiVersion: "2024-06-20" });

/** Stripe Webhook */
export const stripeWebhook = f.https.onRequest(async (req, res) => {
  if (!stripeSecret || !stripeWebhookSecret) return res.status(500).send("Stripe env not set");
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, stripeWebhookSecret);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const s = event.data.object as Stripe.Checkout.Session;
      const uid = s.metadata?.uid || null;
      const subId = (s.subscription as string) || null;
      if (uid) {
        await db.collection("payments").doc(s.id).set({
          uid,
          amount: s.amount_total,
          currency: s.currency,
          status: s.payment_status,
          stripeId: s.id,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
      if (uid && subId) {
        const sub = await stripe.subscriptions.retrieve(subId);
        await db.collection("subscriptions").doc(sub.id).set(
          {
            uid,
            plan: sub.items.data[0]?.price?.id ?? null,
            status: sub.status,
            current_period_end: sub.current_period_end,
            stripeId: sub.id,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await db.collection("subscriptions").doc(sub.id).set(
        {
          uid: sub.metadata?.uid ?? null,
          plan: sub.items.data[0]?.price?.id ?? null,
          status: sub.status,
          current_period_end: sub.current_period_end,
          stripeId: sub.id,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      break;
    }
    default:
      break;
  }
  return res.json({ received: true });
});

/** Cal.com Webhook (event.created/event.updated) */
export const calcomWebhook = f.https.onRequest(async (req, res) => {
  const body = req.body || {};
  const payload = body?.payload ?? body;
  if (!payload?.booking) return res.status(400).send("Bad payload");

  const b = payload.booking;
  const id = String(b.uid || b.id || b.hash || Date.now());
  const doc = {
    uid: b.attendee?.id ?? null,
    email: b.attendee?.email ?? null,
    name: b.attendee?.name ?? null,
    start: b.startTime,
    end: b.endTime,
    type: b.eventType?.slug ?? b.title ?? "booking",
    status: b.status ?? "confirmed",
    calId: b?.uid ?? null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  await db.collection("bookings").doc(id).set(doc, { merge: true });
  return res.json({ ok: true });
});

/** Auth onCreate → users profile */
export const onUserCreate = f.auth.user().onCreate(async (user) => {
  await db.collection("users").doc(user.uid).set({
    email: user.email,
    name: user.displayName ?? null,
    role: "client",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});

/** Storage finalize → index in Firestore and optionally ingest to ImageKit */
export const onFileUpload = f.storage.object().onFinalize(async (obj) => {
  const name = obj.name || "";
  const match = name.match(/^users\/([^/]+)\/(.+)$/);
  if (!match) return;
  const uid = match[1];
  const path = match[2];

  // Example: signed URL to hand off to external ingest if you build one
  const [signed] = await storage.bucket(obj.bucket).file(name).getSignedUrl({
    action: "read",
    expires: Date.now() + 15 * 60 * 1000,
  });
  void signed; // placeholder

  await db.collection("files").add({
    uid,
    path,
    ikUrl: null,
    visibility: "private",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});

/** Example admin HTTPS for publishing testimonials */
export const publishTestimonial = f.https.onRequest(async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) return res.status(401).send("Unauthorized");
  const idToken = authHeader.slice(7);
  const decoded = await admin.auth().verifyIdToken(idToken);
  if (!(decoded as any).admin) return res.status(403).send("Admin only");

  const { submissionId } = req.body || {};
  if (!submissionId) return res.status(400).send("submissionId required");
  const snap = await db.collection("testimonialSubmissions").doc(submissionId).get();
  if (!snap.exists) return res.status(404).send("Submission not found");
  const data = snap.data()!;

  await db.collection("testimonials").add({
    name: data.name,
    text: data.text,
    avatarUrl: data.avatarUrl ?? null,
    company: data.company ?? null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  await snap.ref.delete();
  return res.json({ published: true });
});

