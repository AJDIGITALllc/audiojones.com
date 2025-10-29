import React from 'react';

export default function CTA() {
  return (
    <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <a
        href="#book"
        className="inline-flex h-12 items-center justify-center rounded-full px-6 text-base font-bold text-black shadow-[4px_4px_0_rgba(255,107,19,0.75)]"
        style={{ backgroundImage: 'linear-gradient(135deg,#FF4500,#FFD700)' }}
      >
        Book a Strategy Call
      </a>
      <a href="#services" className="text-white/80 hover:text-white underline-offset-4 hover:underline">
        Explore Services
      </a>
    </div>
  );
}