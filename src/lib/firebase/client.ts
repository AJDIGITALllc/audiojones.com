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

function createFirebaseApp(): FirebaseApp | null {
  try {
    if (!firebaseConfig.apiKey) {
      // During build time, return null - Firebase will only be used at runtime
      if (typeof window === 'undefined') {
        console.warn('Firebase not initialized: missing configuration (build time)');
        return null;
      }
      throw new Error("Missing Firebase configuration. Please check your environment variables.");
    }
    return getApps().length ? getApp() : initializeApp(firebaseConfig);
  } catch (error) {
    if (typeof window === 'undefined') {
      // During build, just warn and return null
      console.warn('Firebase initialization failed during build:', error);
      return null;
    }
    throw error;
  }
}

const app = createFirebaseApp();

// Only initialize Firebase services if app exists
export { app };
export const auth = app ? getAuth(app) : null as any;
export const storage = app ? getStorage(app) : null as any;
export const functions = app ? getFunctions(app) : null as any;
export const db = app ? getFirestore(app) : null as any;
export const googleProvider = new GoogleAuthProvider();
