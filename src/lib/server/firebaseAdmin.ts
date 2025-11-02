/**
 * Firebase Admin SDK Server Utilities
 *
 * Provides singleton Firebase Admin app instance for server-side operations.
 * Uses service account credentials from environment variables.
 *
 * @module lib/server/firebaseAdmin
 */

import 'server-only';

import * as admin from 'firebase-admin';

/** Singleton Firebase Admin app instance */
let adminApp: admin.app.App | null = null;

/**
 * Require an environment variable or throw error
 *
 * @param name - Environment variable name
 * @returns Environment variable value
 * @throws {Error} If environment variable is not set
 * @private
 */
function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

/**
 * Get Firebase Admin App (Singleton)
 *
 * Returns the initialized Firebase Admin app instance. If not already initialized,
 * creates a new instance using service account credentials from environment variables.
 *
 * Required environment variables:
 * - FIREBASE_PROJECT_ID
 * - FIREBASE_CLIENT_EMAIL
 * - FIREBASE_PRIVATE_KEY (newlines should be \n, will be converted to real newlines)
 *
 * @returns Firebase Admin app instance
 * @throws {Error} If required environment variables are missing
 *
 * @example
 * ```typescript
 * const app = getAdminApp();
 * const firestore = app.firestore();
 * ```
 */
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

/**
 * Get Firebase Admin Auth Service
 *
 * Provides access to Firebase Admin Auth for:
 * - Verifying ID tokens
 * - Managing users
 * - Setting custom claims
 * - Revoking tokens
 *
 * @returns Firebase Admin Auth instance
 *
 * @example
 * Verify ID token:
 * ```typescript
 * const decodedToken = await adminAuth().verifyIdToken(token, true);
 * console.log('User ID:', decodedToken.uid);
 * console.log('Is admin:', decodedToken.admin);
 * ```
 *
 * @example
 * Set custom claims:
 * ```typescript
 * await adminAuth().setCustomUserClaims(uid, { admin: true });
 * ```
 */
export function adminAuth() {
  return getAdminApp().auth();
}

/** Back-compat alias for existing imports */
export const getAdminAuth = adminAuth;
