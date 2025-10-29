import React from 'react';

export default function Hero() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="mx-auto mt-8 aspect-square w-full max-w-[560px] rounded-3xl bg-[#0c0c0c] p-4 ring-1 ring-white/10">
          <img
            src="/assets/audio-jones-hero.webp"
            alt="Audio Jones portrait"
            className="h-full w-full rounded-2xl object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}