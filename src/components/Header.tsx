"use client";

import Link from "next/link";
import { useState } from "react";
import IKImage from "@/components/IKImage";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  
  // Check if user has admin privileges
  const isAdmin = user?.customClaims?.admin === true;

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
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-x-10">
            <Link href="/" className="text-sm font-semibold text-white/80 hover:text-white transition">Home</Link>
            <Link href="/services" className="text-sm font-semibold text-white/80 hover:text-white transition">Services</Link>
            <Link href="/podcast" className="text-sm font-semibold text-white/80 hover:text-white transition">Podcast</Link>
            <Link href="/insights" className="text-sm font-semibold text-white/80 hover:text-white transition">Insights</Link>
            <Link href="/about" className="text-sm font-semibold text-white/80 hover:text-white transition">About</Link>
            
            {/* Admin-only navigation links */}
            {isAdmin && (
              <>
                <Link href="/artist-hub" className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition">Artist Hub</Link>
                <Link href="/epm" className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition">EPM</Link>
                <Link href="/ops/docs" className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition">Ops Docs</Link>
              </>
            )}
            
            <Link href="/book" className="rounded-full px-4 py-2 text-sm font-bold text-black bg-gradient-to-r from-[#FF4500] to-[#FFD700] hover:opacity-90 transition">Book a Call</Link>
            <Link href="/portal" className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20 transition">Portal</Link>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="px-6 py-6 space-y-4">
            <Link href="/" className="block text-base font-semibold text-white/80 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/services" className="block text-base font-semibold text-white/80 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link href="/podcast" className="block text-base font-semibold text-white/80 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Podcast</Link>
            <Link href="/insights" className="block text-base font-semibold text-white/80 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Insights</Link>
            <Link href="/about" className="block text-base font-semibold text-white/80 hover:text-white" onClick={() => setMobileMenuOpen(false)}>About</Link>
            
            {/* Admin-only navigation links */}
            {isAdmin && (
              <div className="pt-4 border-t border-white/10 space-y-4">
                <Link href="/artist-hub" className="block text-base font-semibold text-orange-400 hover:text-orange-300" onClick={() => setMobileMenuOpen(false)}>Artist Hub</Link>
                <Link href="/epm" className="block text-base font-semibold text-orange-400 hover:text-orange-300" onClick={() => setMobileMenuOpen(false)}>EPM</Link>
                <Link href="/ops/docs" className="block text-base font-semibold text-orange-400 hover:text-orange-300" onClick={() => setMobileMenuOpen(false)}>Ops Docs</Link>
              </div>
            )}
            
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link href="/book" className="block text-center rounded-full px-4 py-3 text-base font-bold text-black bg-gradient-to-r from-[#FF4500] to-[#FFD700] hover:opacity-90" onClick={() => setMobileMenuOpen(false)}>Book a Call</Link>
              <Link href="/portal" className="block text-center rounded-full bg-white/10 px-4 py-3 text-base font-bold text-white hover:bg-white/20" onClick={() => setMobileMenuOpen(false)}>Portal</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

