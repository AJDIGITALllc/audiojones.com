// src/lib/server/firebaseAdmin.ts
import 'server-only';

import * as admin from 'firebase-admin';

let adminApp: admin.app.App | null = null;

/**
 * Cached credential loader - only loads env vars when actually needed
 */
function loadFirebaseCredentials() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(`Missing Firebase credentials. Required env vars: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY`);
  }

  // Vercel stores newlines as \n; convert to real newlines
  return {
    projectId,
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, '\n')
  };
}

/** Get (singleton) Firebase Admin app for server code */
export function getAdminApp(): admin.app.App {
  if (!adminApp) {
    if (!admin.apps.length) {
      const credentials = loadFirebaseCredentials();
      adminApp = admin.initializeApp({
        credential: admin.credential.cert(credentials),
      });
    } else {
      adminApp = admin.apps[0];
    }
  }
  return adminApp!;
}

/** Firebase Admin Auth accessor (server only) */
export function adminAuth() {
  return getAdminApp().auth();
}

/** Back-compat alias for existing imports */
export const getAdminAuth = adminAuth;

/** Firebase Admin Firestore accessor (server only) */
export function getFirestoreDb() {
  return admin.firestore(getAdminApp());
}

/** 
 * Lazy Firestore DB accessor - replaces the eager `db` export
 * Use this instead of importing `db` directly
 */
export function getDb() {
  return getFirestoreDb();
}
