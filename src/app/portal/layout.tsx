"use client";
import { useRequireAuth } from "@/lib/client/useRequireAuth";
import PortalNav from "@/app/portal/components/PortalNav";

/**
 *
 */
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useRequireAuth({ redirectTo: "/login" });

  if (loading) {
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
