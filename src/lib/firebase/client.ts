import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Creates and initializes a Firebase app instance.
 * @returns {FirebaseApp} The initialized Firebase app.
 * @throws {Error} If Firebase environment variables are missing.
 */
function createFirebaseApp(): FirebaseApp {
  if (!firebaseConfig.apiKey) {
    throw new Error("Missing Firebase env vars");
  }
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

/** The initialized Firebase app instance. */
export const app = createFirebaseApp();
/** The Firebase Auth instance. */
export const auth = getAuth(app);
/** The Firebase Storage instance. */
export const storage = getStorage(app);
/** The Firebase Functions instance. */
export const functions = getFunctions(app);
/** The Firebase Firestore instance. */
export const db = getFirestore(app);
/** The Google Auth provider instance. */
export const googleProvider = new GoogleAuthProvider();
