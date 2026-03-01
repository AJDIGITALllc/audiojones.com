"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, type User } from "firebase/auth";
import { getFirebaseApp } from "@/lib/firebase/client";

interface AuthUser extends User {
  customClaims?: {
    admin?: boolean;
    role?: string;
    [key: string]: any;
  };
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const app = getFirebaseApp();
    if (!app) {
      setLoading(false);
      return;
    }

    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        // Get fresh token to access custom claims
        const tokenResult = await u.getIdTokenResult();
        const authUser: AuthUser = {
          ...u,
          customClaims: tokenResult.claims
        };
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, loading };
}

