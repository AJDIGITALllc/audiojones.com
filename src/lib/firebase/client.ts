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

let firebaseApp: FirebaseApp | null = null;

function createFirebaseApp(): FirebaseApp | null {
  if (firebaseApp) return firebaseApp;

  if (!firebaseConfig.apiKey) {
    console.warn('[Firebase] Missing NEXT_PUBLIC_FIREBASE_* environment variables - Firebase features will be disabled');
    return null;
  }

  firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return firebaseApp;
}

// Lazy initialization - only create when accessed
let _auth: any = null;
let _storage: any = null;
let _functions: any = null;
let _db: any = null;
let _googleProvider: any = null;

export const getFirebaseApp = (): FirebaseApp | null => createFirebaseApp();

export const auth = new Proxy({} as any, {
  get(target, prop) {
    if (!_auth) {
      try {
        const app = createFirebaseApp();
        if (!app) return undefined;
        _auth = getAuth(app);
      } catch (error) {
        console.warn('[Firebase] Auth initialization failed:', error);
        return undefined;
      }
    }
    return _auth[prop];
  }
});

export const storage = new Proxy({} as any, {
  get(target, prop) {
    if (!_storage) {
      const app = createFirebaseApp();
      if (!app) return undefined;
      _storage = getStorage(app);
    }
    return _storage[prop];
  }
});

export const functions = new Proxy({} as any, {
  get(target, prop) {
    if (!_functions) {
      const app = createFirebaseApp();
      if (!app) return undefined;
      _functions = getFunctions(app);
    }
    return _functions[prop];
  }
});

export const db = new Proxy({} as any, {
  get(target, prop) {
    if (!_db) {
      const app = createFirebaseApp();
      if (!app) return undefined;
      _db = getFirestore(app);
    }
    return _db[prop];
  }
});

export const googleProvider = new Proxy({} as any, {
  get(target, prop) {
    if (!_googleProvider) {
      _googleProvider = new GoogleAuthProvider();
    }
    return _googleProvider[prop];
  }
});
