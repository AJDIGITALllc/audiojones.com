import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-3xl font-bold mb-6">Join Audio Jones</h1>
      <AuthForm mode="register" />
      <p className="text-sm text-white/70 mt-6">
        Already have an account? <Link href="/login" className="text-[#FFD700] underline">Log in</Link>
      </p>
    </div>
  );
}

