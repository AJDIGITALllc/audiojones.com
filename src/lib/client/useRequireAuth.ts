"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

type Options = {
  redirectTo?: string; // e.g. "/login"
  requireAdmin?: boolean;
};

/**
 * A hook for protecting routes that require authentication.
 * It redirects the user to a specified page if they are not authenticated.
 * @param {Options} [options] - The options for the hook.
 * @returns {{user: User | null, loading: boolean, isAdmin: boolean}} An object containing the user, loading state, and admin status.
 */
export function useRequireAuth(options?: Options) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        if (options?.redirectTo) router.replace(options.redirectTo);
        return;
      }
      let admin = false;
      try {
        const token = await u.getIdTokenResult();
        admin = !!(token.claims as any)?.admin;
      } catch {}
      setUser(u);
      setIsAdmin(admin);
      setLoading(false);
      if (options?.requireAdmin && !admin && options?.redirectTo) {
        router.replace(options.redirectTo);
      }
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.redirectTo, options?.requireAdmin]);

  return { user, loading, isAdmin };
}

