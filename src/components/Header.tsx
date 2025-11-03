"use client";

import Link from "next/link";
import { useState } from "react";
import IKImage from "@/components/IKImage";
import { CTA_LINKS } from "@/config/marketing";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: CTA_LINKS.servicesOverview, label: "Service Matrix" },
    { href: CTA_LINKS.artistHub, label: "Artist Hub" },
    { href: CTA_LINKS.epm, label: "EPM" },
    { href: CTA_LINKS.portal, label: "Client Portal" },
  ] as const;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-sans bg-black/80 backdrop-blur-lg border-b border-white/10">
      <nav aria-label="Global" className="container mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">Audio Jones</span>
              <IKImage
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/AUDIO_JONES_LOGO_2025/AUDIO_JONES_LOGO_2025_HORIZONTAL_TRANSPARENT.png?updatedAt=1761669548119"
                alt="Audio Jones Logo"
                width={160}
                height={32}
                priority
              />
            </Link>
          </div>
          <div className="flex md:hidden">
            <button
              aria-label="Toggle main menu"
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="text-sm font-semibold">{mobileMenuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-x-8 lg:gap-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white/80 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={CTA_LINKS.bookStrategy}
              className="rounded-full px-4 py-2 text-sm font-bold text-black bg-gradient-to-r from-[#FF4500] to-[#FFD700] hover:opacity-90 transition"
            >
              Book a Call
            </Link>
            <Link
              href={CTA_LINKS.portal}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20 transition"
            >
              Client Portal
            </Link>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base font-semibold text-white/80 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link
                href={CTA_LINKS.bookStrategy}
                className="block text-center rounded-full px-4 py-3 text-base font-bold text-black bg-gradient-to-r from-[#FF4500] to-[#FFD700] hover:opacity-90"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Call
              </Link>
              <Link
                href={CTA_LINKS.portal}
                className="block text-center rounded-full bg-white/10 px-4 py-3 text-base font-bold text-white hover:bg-white/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                Client Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
