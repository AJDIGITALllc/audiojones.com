/**
 * Authentication Hook
 *
 * React hook for managing Firebase authentication state with custom claims support.
 *
 * @module hooks/useAuth
 */

"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/client";
import { onAuthStateChanged, type User } from "firebase/auth";

/** Extended User type with custom claims from Firebase */
interface AuthUser extends User {
  /** Custom claims for role-based access control */
  customClaims?: {
    /** Admin flag for admin portal access */
    admin?: boolean;
    /** User role (e.g., "super-admin", "editor") */
    role?: string;
    /** Additional custom claims */
    [key: string]: any;
  };
}

/**
 * Use Firebase Authentication
 *
 * Manages authentication state and provides access to current user with custom claims.
 * Automatically updates when auth state changes (login, logout, token refresh).
 *
 * @returns Object containing user, loading state
 *
 * @example
 * ```typescript
 * function MyComponent() {
 *   const { user, loading } = useAuth();
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (!user) return <div>Please log in</div>;
 *
 *   return <div>Welcome, {user.email}!</div>;
 * }
 * ```
 *
 * @example
 * Check admin status:
 * ```typescript
 * const { user } = useAuth();
 * const isAdmin = user?.customClaims?.admin === true;
 * ```
 */
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

