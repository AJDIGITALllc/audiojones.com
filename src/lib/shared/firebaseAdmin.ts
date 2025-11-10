// src/lib/shared/firebaseAdmin.ts
// Centralized Firebase Admin initialization for API routes
import 'server-only';
import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

/**
 * Get or initialize Firebase Admin app singleton
 * Safe to call multiple times - will return existing app if already initialized
 */
export function getFirebaseApp(): App {
  // Return existing app if already initialized
  if (getApps().length > 0) {
    return getApps()[0]!;
  }

  // Initialize new app with environment variables
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing Firebase Admin credentials in environment variables");
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

/**
 * Get Firestore instance using the shared Firebase app
 */
export function getFirestoreDb() {
  return getFirestore(getFirebaseApp());
}