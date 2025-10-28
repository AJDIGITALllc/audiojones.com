import * as admin from "firebase-admin";
import * as f from "firebase-functions";
import Stripe from "stripe";
import fetch from "node-fetch";
import { google } from "googleapis";
import * as DropboxSign from "@dropbox/sign";

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

/** Whop Webhook (order.created, license.activated) */
export const whopWebhook = f.https.onRequest(async (req, res) => {
  // Basic shared-secret verification. Configure your secret in Functions env.
  const secret = process.env.WHOP_WEBHOOK_SECRET;
  if (!secret) return res.status(500).send("WHOP_WEBHOOK_SECRET not set");

  const headerSig = (req.headers["whop-signature"] || req.headers["x-whop-signature"] || "") as string;
  const auth = (req.headers["authorization"] || "") as string; // allow Bearer <secret>
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const ok = headerSig === secret || token === secret;
  if (!ok) return res.status(401).send("Invalid signature");

  const event = req.body || {};
  const type = event.type || event.event || "unknown";
  const data = event.data || event.payload || {};

  try {
    switch (type) {
      case "order.created": {
        const id = String(data.id || data.order_id || Date.now());
        await db.collection("orders").doc(id).set(
          {
            id,
            email: data.customer?.email ?? null,
            name: data.customer?.name ?? null,
            amount: data.amount ?? null,
            product: data.product?.name ?? data.product_name ?? null,
            status: data.status ?? "created",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
        break;
      }
      case "license.activated": {
        const id = String(data.id || data.license_id || Date.now());
        await db.collection("licenses").doc(id).set(
          {
            id,
            uid: data.customer?.id ?? null,
            email: data.customer?.email ?? null,
            product: data.product?.name ?? data.product_name ?? null,
            active: true,
            expires: data.expires_at ?? null,
            status: data.status ?? "active",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
        break;
      }
      default:
        // noop for other events
        break;
    }
    return res.json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Failed to handle webhook" });
  }
});

/** Scheduled: Sync Whop customers into Firestore users */
export const syncWhopCustomers = f.pubsub.schedule("every 6 hours").onRun(async () => {
  const apiKey = process.env.WHOP_API_KEY;
  const base = process.env.WHOP_API_URL || "https://api.whop.com/v2";
  if (!apiKey) {
    console.warn("WHOP_API_KEY not set; skipping sync");
    return null;
  }
  const res = await fetch(`${base}/customers`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) {
    console.error("Whop sync failed", res.status, await res.text());
    return null;
  }
  const data = (await res.json()) as any;
  const list = data?.data || [];
  for (const c of list) {
    const id = String(c.id);
    await db.collection("users").doc(id).set(
      {
        email: c.email ?? null,
        name: c.name ?? null,
        plan: c.plan_name ?? null,
        status: c.status ?? null,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }
  return null;
});

/** Generate contract from Docs template and store PDF to Drive */
export const generateContract = f.https.onRequest(async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) return res.status(401).send("Unauthorized");
    const idToken = authHeader.slice(7);
    const decoded = await admin.auth().verifyIdToken(idToken);

    const { uid, templateId, folderId, name, fields, sendForSignature, signerEmail, signerName, ccEmail } = req.body || {};
    if (!templateId || !folderId || !name) return res.status(400).send("Missing templateId, folderId, name");
    if (!decoded.admin && decoded.uid !== uid) return res.status(403).send("Forbidden");

    const scopes = [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/documents",
    ];
    const auth = await google.auth.getClient({ scopes });
    const drive = google.drive({ version: "v3", auth });
    const docs = google.docs({ version: "v1", auth });

    // 1) Copy the template Doc
    const copyResp = await drive.files.copy({ fileId: templateId, requestBody: { name, parents: [folderId] } });
    const newDocId = copyResp.data.id!;

    // 2) Replace merge fields via Docs batchUpdate
    const requests = Object.entries(fields || {}).map(([key, value]) => ({
      replaceAllText: {
        containsText: { text: `{{${key}}}`, matchCase: false },
        replaceText: String(value ?? ""),
      },
    }));
    if (requests.length) {
      await docs.documents.batchUpdate({ documentId: newDocId, requestBody: { requests } });
    }

    // 3) Export to PDF and upload back to Drive in same folder
    const pdfResp = await drive.files.export({ fileId: newDocId, mimeType: "application/pdf" }, { responseType: "arraybuffer" });
    const pdfMedia = Buffer.from(pdfResp.data as ArrayBuffer);
    const pdfUpload = await drive.files.create({
      requestBody: { name: `${name}.pdf`, parents: [folderId], mimeType: "application/pdf" },
      media: { mimeType: "application/pdf", body: Buffer.from(pdfMedia) as any },
    });
    const pdfFileId = pdfUpload.data.id!;

    // 4) Optionally send for signature via Dropbox Sign (email delivery)
    let signatureRequestId: string | null = null;
    if (sendForSignature && signerEmail && process.env.DROPBOX_SIGN_API_KEY) {
      const hs = new DropboxSign.SignatureRequestApi();
      hs.username = process.env.DROPBOX_SIGN_API_KEY;
      const signer = { emailAddress: String(signerEmail), name: String(signerName || signerEmail) } as any;
      const reqBody: any = {
        title: name,
        subject: `Signature Request: ${name}`,
        message: "Please review and sign the attached agreement.",
        signers: [signer],
        ccEmailAddresses: ccEmail ? [String(ccEmail)] : undefined,
        fileUrls: [
          // Use signed URL for the generated PDF
          (await drive.files.get({ fileId: pdfFileId, alt: "media" /* placeholder */ })) &&
            (await storage.bucket().file("/devnull").getSignedUrl({ action: "read", expires: Date.now() + 15 * 60 * 1000 })) &&
            // Fallback if above fails: export URL; however we cannot trivially produce a direct URL without auth.
            undefined,
        ],
      };
      // Instead of fileUrls (since Drive signed URL from here is cumbersome), export bytes and send as file content is not supported by SDK directly without fs.
      // Therefore, we send using file_url after creating a public link temporarily.
      try {
        const driveGet = await drive.files.get({ fileId: pdfFileId, fields: "webViewLink, webContentLink, permissions" });
        // create anyone with link reader permission
        await drive.permissions.create({ fileId: pdfFileId, requestBody: { role: "reader", type: "anyone" } });
        const publicMeta = await drive.files.get({ fileId: pdfFileId, fields: "webViewLink, webContentLink" });
        const fileUrl = publicMeta.data.webContentLink || publicMeta.data.webViewLink;
        if (fileUrl) {
          const sr = await hs.signatureRequestSend({
            signatureRequestSendRequest: {
              title: name,
              subject: `Signature Request: ${name}`,
              message: "Please review and sign the attached agreement.",
              signers: [{ emailAddress: signer.emailAddress, name: signer.name }],
              ccEmailAddresses: ccEmail ? [String(ccEmail)] : undefined,
              fileUrls: [fileUrl],
            },
          });
          signatureRequestId = (sr.body as any)?.signature_request?.signature_request_id || null;
        }
      } catch (e) {
        console.error("Dropbox Sign send failed", e);
      }
    }

    // 5) Record in Firestore
    const ref = await db.collection("contracts").add({
      uid: uid || decoded.uid,
      status: sendForSignature && signatureRequestId ? "sent_for_signature" : "generated",
      driveFileId: newDocId,
      pdfFileId,
      signedUrl: null,
      signatureRequestId: signatureRequestId || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.json({ contractId: ref.id, docId: newDocId, pdfFileId, signatureRequestId });
  } catch (e: any) {
    console.error(e);
    return res.status(500).send(e?.message || "Contract generation failed");
  }
});

/** Get Drive links (optionally create public read) */
export const getDriveLinks = f.https.onRequest(async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) return res.status(401).send("Unauthorized");
    const idToken = authHeader.slice(7);
    await admin.auth().verifyIdToken(idToken);

    const { fileId, makePublic } = req.body || {};
    if (!fileId) return res.status(400).send("fileId required");

    const scopes = ["https://www.googleapis.com/auth/drive"];
    const auth = await google.auth.getClient({ scopes });
    const drive = google.drive({ version: "v3", auth });

    if (makePublic) {
      await drive.permissions.create({ fileId, requestBody: { role: "reader", type: "anyone" } });
    }
    const meta = await drive.files.get({ fileId, fields: "webViewLink, webContentLink" });
    return res.json({ webViewLink: meta.data.webViewLink, webContentLink: meta.data.webContentLink });
  } catch (e: any) {
    console.error(e);
    return res.status(500).send(e?.message || "Failed to get links");
  }
});
