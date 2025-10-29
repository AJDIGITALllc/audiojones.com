"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

/**
 * Renders the password reset page.
 * This page displays a form for users to enter their email address and request
 * a password reset link.
 * @returns {JSX.Element} The password reset page component.
 */
export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /**
   *
   */
  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Reset link sent. Check your inbox.");
      setError("");
    } catch (err: unknown) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleReset} className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-sm w-full flex flex-col gap-4">
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="rounded-md bg-white/10 text-white px-3 py-2 border border-white/10 focus:border-[#FF4500] focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] text-black font-semibold py-2 hover:opacity-90 transition">
          Send Reset Link
        </button>
        {message && <p className="text-green-400 text-sm">{message}</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>
    </div>
  );
}

