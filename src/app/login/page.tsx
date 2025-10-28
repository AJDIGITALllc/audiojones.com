"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase/client";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signInGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      router.replace("/portal");
    } catch (e: any) {
      setError(e?.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.replace("/portal");
    } catch (e: any) {
      setError(e?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white grid place-items-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-extrabold mb-1">{mode === "login" ? "Sign in" : "Create account"}</h1>
        <p className="text-white/70 mb-6 text-sm">Access your client portal.</p>

        <button
          onClick={signInGoogle}
          disabled={loading}
          className="w-full h-11 rounded-full bg-white text-black font-semibold mb-4 disabled:opacity-60"
        >
          Continue with Google
        </button>

        <div className="relative my-4 text-center">
          <span className="px-3 text-xs text-white/50 bg-black relative z-10">or</span>
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/10" />
        </div>

        <form onSubmit={submitEmail} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full bg-white/10 border border-white/20 px-4 py-3 placeholder-white/40 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-full bg-white/10 border border-white/20 px-4 py-3 placeholder-white/40 focus:outline-none"
            required
            minLength={6}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] text-black font-bold disabled:opacity-60"
          >
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <div className="mt-6 text-center text-sm text-white/70">
          {mode === "login" ? (
            <button onClick={() => setMode("register")} className="underline">Create an account</button>
          ) : (
            <button onClick={() => setMode("login")} className="underline">Have an account? Sign in</button>
          )}
        </div>
      </div>
    </main>
  );
}

