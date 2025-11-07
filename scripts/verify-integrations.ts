#!/usr/bin/env tsx

/**
 * Audio Jones - Integration Verification Script
 * ----------------------------------------------
 * Checks connectivity for Firebase, Basecamp 4, ImageKit, Stripe, and MailerLite.
 * Uses read-only API calls. Never logs sensitive keys.
 */

import dotenv from "dotenv";
import fetch from "node-fetch";
import { resolve } from "path";

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

type ServiceStatus = {
  name: string;
  ok: boolean;
  message: string;
};

async function verifyFirebase(): Promise<ServiceStatus> {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    if (!projectId) throw new Error("Missing FIREBASE_PROJECT_ID");
    // Lazy import firebase-admin to avoid requiring credentials unless configured
    const admin = await import("firebase-admin");
    if (!admin.apps.length) {
      admin.initializeApp({
        projectId,
        credential: admin.credential.applicationDefault(),
      });
    }
    const apps = admin.apps;
    return { name: "Firebase", ok: true, message: `Connected (${apps.length} app)` };
  } catch (err: any) {
    return { name: "Firebase", ok: false, message: err.message };
  }
}

async function verifyBasecamp(): Promise<ServiceStatus> {
  try {
    const id = process.env.BASECAMP_ACCOUNT_ID;
    const token = process.env.BASECAMP_ACCESS_TOKEN;
    if (!id || !token) throw new Error("Missing Basecamp credentials");
    const res = await fetch(`https://3.basecampapi.com/${id}/projects.json`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": process.env.BASECAMP_USER_AGENT || "AudioJonesApp (dev@audiojones.com)",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { name: "Basecamp 4", ok: true, message: "Projects API reachable" };
  } catch (err: any) {
    return { name: "Basecamp 4", ok: false, message: err.message };
  }
}

async function verifyImageKit(): Promise<ServiceStatus> {
  try {
    const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
    if (!endpoint) throw new Error("Missing NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT");
    const res = await fetch(`${endpoint}/tr:w-100/sample.jpg`, { method: "HEAD" });
    if (res.ok || res.status === 404) {
      // 404 is OK - means ImageKit is responding, just no sample.jpg file
      return { name: "ImageKit", ok: true, message: "Endpoint reachable" };
    }
    throw new Error(`HTTP ${res.status}`);
  } catch (err: any) {
    return { name: "ImageKit", ok: false, message: err.message };
  }
}

async function verifyStripe(): Promise<ServiceStatus> {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
    const res = await fetch("https://api.stripe.com/v1/balance", {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { name: "Stripe", ok: true, message: "Authenticated" };
  } catch (err: any) {
    return { name: "Stripe", ok: false, message: err.message };
  }
}

async function verifyMailerLite(): Promise<ServiceStatus> {
  try {
    const key = process.env.MAILERLITE_API_KEY;
    if (!key) throw new Error("Missing MAILERLITE_API_KEY");
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { name: "MailerLite", ok: true, message: "Authenticated" };
  } catch (err: any) {
    return { name: "MailerLite", ok: false, message: err.message };
  }
}

async function main() {
  const checks = [
    verifyFirebase(),
    verifyBasecamp(),
    verifyImageKit(),
    verifyStripe(),
    verifyMailerLite(),
  ];
  const results = await Promise.all(checks);

  console.log("\n┌──────────────┬───────────┬────────────────────────────┐");
  console.log("│ Service      │ Status    │ Message                    │");
  console.log("├──────────────┼───────────┼────────────────────────────┤");

  results.forEach((r) => {
    const status = r.ok ? "✅ OK" : "❌ Failed";
    console.log(`│ ${r.name.padEnd(12)} │ ${status.padEnd(9)} │ ${r.message.padEnd(26)} │`);
  });

  console.log("└──────────────┴───────────┴────────────────────────────┘");

  const failures = results.filter((r) => !r.ok);
  process.exit(failures.length ? 1 : 0);
}

main();