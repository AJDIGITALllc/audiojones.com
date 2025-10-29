"use client";

import AuthForm from "@/components/AuthForm";
import Link from "next/link";

/**
 * Renders the login page.
 * This page displays an authentication form in "login" mode and includes a link
 * to the registration page for new users.
 * @returns {JSX.Element} The login page component.
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
      <AuthForm mode="login" />
      <p className="text-sm text-white/70 mt-6">
        Don’t have an account? <Link href="/register" className="text-[#FFD700] underline">Create one</Link>
      </p>
    </div>
  );
}
