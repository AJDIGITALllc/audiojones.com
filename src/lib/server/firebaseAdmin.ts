// src/lib/server/firebaseAdmin.ts
import 'server-only';

import * as admin from 'firebase-admin';

let adminApp: admin.app.App | null = null;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing Firebase env vars`);
  }
  return v;
}

/** Get (singleton) Firebase Admin app for server code */
export function getAdminApp(): admin.app.App {
  if (!admin.apps.length) {
    const projectId = requireEnv('FIREBASE_PROJECT_ID');
    const clientEmail = requireEnv('FIREBASE_CLIENT_EMAIL');
    // Vercel stores newlines as \n; convert to real newlines
    const privateKey = requireEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');

    adminApp = admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
  } else {
    adminApp = admin.apps[0];
  }
  return adminApp!;
}

/** Firebase Admin Auth accessor (server only) */
export function adminAuth() {
  return getAdminApp().auth();
}

/** Back-compat alias for existing imports */
export const getAdminAuth = adminAuth;
