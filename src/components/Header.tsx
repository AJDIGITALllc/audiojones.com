"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import IKImage from "@/components/IKImage";
import { PublicStatusDot } from "@/components/status/PublicStatusDot";
import { usePersona } from "@/hooks/usePersona";
import { mainNav } from "@/config/nav";

// Dynamically import auth navigation to prevent SSR issues
const AuthNav = dynamic(() => import("@/components/AuthNav"), {
  ssr: false,
  loading: () => (
    <Link 
      href="/portal" 
      className="rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-6 py-2 text-sm font-bold text-black shadow-lg hover:scale-105 transition-transform"
    >
      Client Portal
    </Link>
  )
});

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const personaDetection = usePersona();

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
            {mainNav.map((item) => {
              // Special handling for persona-aware items
              if (item.label === "ArtistHub" && personaDetection.persona !== "artist") {
                return null;
              }
              if (item.label === "Admin" && personaDetection.persona !== "consultant") {
                return null;
              }

              // Apply special styling for certain nav items
              const getLinkClassName = () => {
                if (item.label === "EPM Theory") {
                  return "text-sm font-semibold text-[#008080] hover:text-[#FFD700] transition";
                }
                if (item.label === "ArtistHub") {
                  return "text-sm font-semibold text-[#FF4500] hover:text-[#FFD700] transition";
                }
                if (item.label === "Admin") {
                  return "text-sm font-semibold text-red-400 hover:text-red-300 transition";
                }
                return "text-sm font-semibold text-white/80 hover:text-white transition";
              };

              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={getLinkClassName()}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            
            <PublicStatusDot />
            
            <Link href="/book" className="rounded-full px-4 py-2 text-sm font-bold text-black bg-gradient-to-r from-[#FF4500] to-[#FFD700] hover:opacity-90 transition">Book a Call</Link>
            
            <AuthNav />
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="px-6 py-6 space-y-4">
            {mainNav.map((item) => {
              // Special handling for persona-aware items
              if (item.label === "ArtistHub" && personaDetection.persona !== "artist") {
                return null;
              }
              if (item.label === "Admin" && personaDetection.persona !== "consultant") {
                return null;
              }

              // Apply special styling for certain nav items
              const getLinkClassName = () => {
                if (item.label === "EPM Theory") {
                  return "block text-base font-semibold text-[#008080] hover:text-[#FFD700]";
                }
                if (item.label === "ArtistHub") {
                  return "block text-base font-semibold text-[#FF4500] hover:text-[#FFD700]";
                }
                if (item.label === "Admin") {
                  return "block text-base font-semibold text-red-400 hover:text-red-300";
                }
                return "block text-base font-semibold text-white/80 hover:text-white";
              };

              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={getLinkClassName()}
                  onClick={() => setMobileMenuOpen(false)}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            
            <div className="flex items-center py-2">
              <PublicStatusDot />
            </div>
            
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

