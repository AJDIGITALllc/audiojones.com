// src/lib/server/firebaseAdmin.ts
import 'server-only';
import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let adminApp: App;

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

/**
 * Initializes a singleton Firebase Admin app for server-side usage only.
 * Works on Vercel by converting literal "\n" into real newlines in PRIVATE_KEY.
 */
function initAdmin(): App {
  const existing = getApps();
  if (existing.length) return existing[0]!;
  return initializeApp({
    credential: cert({
      projectId: required('FIREBASE_PROJECT_ID'),
      clientEmail: required('FIREBASE_CLIENT_EMAIL'),
      privateKey: required('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n')
    })
  });
}

adminApp = initAdmin();

export const adminAuth = getAuth(adminApp);