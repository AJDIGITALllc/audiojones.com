"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { name: "Overview", path: "/portal" },
  { name: "Bookings", path: "/portal/bookings" },
  { name: "Payments", path: "/portal/payments" },
  { name: "Files", path: "/portal/files" },
  { name: "Contracts", path: "/portal/contracts" },
  { name: "CRM", path: "/portal/crm" },
];

export default function PortalNav() {
  const pathname = usePathname();
  return (
    <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 px-6 py-4 text-sm">
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
    </nav>
  );
}

