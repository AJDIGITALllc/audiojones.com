"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import PortalNav from "@/app/portal/components/PortalNav";

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
      <PortalNav />
      <main className="p-6">{children}</main>
    </div>
  );
}
