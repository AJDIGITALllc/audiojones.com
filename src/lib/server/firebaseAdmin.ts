import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let adminApp: App | null = null;

export function getAdminApp() {
  if (adminApp) return adminApp;
  const json = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (!json) throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS_JSON for firebase-admin");
  const creds = JSON.parse(json);
  adminApp = getApps().length ? (getApps()[0] as App) : initializeApp({ credential: cert(creds) });
  return adminApp;
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

