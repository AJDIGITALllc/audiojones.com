"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/client";
import { getIdToken, onAuthStateChanged, signOut } from "firebase/auth";

const baseItems = [
  { name: "Overview", path: "/portal" },
  { name: "Bookings", path: "/portal/bookings" },
  { name: "Payments", path: "/portal/payments" },
  { name: "Files", path: "/portal/files" },
  { name: "Contracts", path: "/portal/contracts" },
];

export default function PortalNav() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) return setIsAdmin(false);
      const token = await u.getIdTokenResult();
      setIsAdmin(!!token.claims.admin);
    });
    return () => unsub();
  }, []);

  const items = isAdmin ? [...baseItems, { name: "CRM", path: "/portal/crm" }] : baseItems;

  return (
    <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-4 text-sm">
        <div className="flex flex-wrap gap-4">
          {items.map((n) => (
            <Link
              key={n.path}
              href={n.path}
              className={pathname === n.path ? "text-[#FFD700]" : "text-white/70 hover:text-white"}
            >
              {n.name}
            </Link>
          ))}
        </div>
        <button
          onClick={async () => { await signOut(auth); window.location.href = "/login"; }}
          className="rounded-full border border-white/20 px-4 py-1.5 text-white/80 hover:bg-white/10"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
