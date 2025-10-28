"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.replace("/login");
      setChecking(false);
    });
    return () => unsub();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center bg-black text-white">
        <p className="text-white/70">Checking authentication…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/10 px-6 py-3 flex gap-4">
        <Link href="/portal">Overview</Link>
        <Link href="/portal/bookings">Bookings</Link>
        <Link href="/portal/contracts">Contracts</Link>
        <Link href="/portal/invoices">Invoices</Link>
        <Link href="/portal/files">Files</Link>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
