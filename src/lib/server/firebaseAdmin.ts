// src/lib/server/firebaseAdmin.ts
import 'server-only';

import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let adminApp: App | null = null;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`[firebaseAdmin] Missing env var: ${name}`);
  return v;
}

/** Get (singleton) Firebase Admin app for server code */
export function getAdminApp(): App {
  if (!adminApp) {
    const projectId = requireEnv('FIREBASE_PROJECT_ID');
    const clientEmail = requireEnv('FIREBASE_CLIENT_EMAIL');
    // Vercel stores newlines as \n; convert to real newlines
    const privateKey = requireEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');

    adminApp = initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }
  return adminApp;
}

/** Firebase Admin Auth accessor (server only) */
export function adminAuth() {
  return getAuth(getAdminApp());
}
