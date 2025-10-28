"use client";

import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebase/client";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";

export default function AuthWidget() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      alert("Sign-in failed");
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      alert("Sign-out failed");
    }
  };

  if (loading) return <div className="text-white/70">Checking auth…</div>;

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {user.photoURL && (
            <img src={user.photoURL} alt="avatar" className="h-8 w-8 rounded-full" />
          )}
          <span className="text-white/90 text-sm">{user.displayName || user.email}</span>
          <button
            onClick={signOutUser}
            className="rounded-full px-4 py-2 bg-white text-black text-sm font-semibold"
          >
            Sign out
          </button>
        </>
      ) : (
        <button
          onClick={signIn}
          className="rounded-full px-4 py-2 bg-white text-black text-sm font-semibold"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}

