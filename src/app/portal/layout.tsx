"use client";
import Link from "next/link";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
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

