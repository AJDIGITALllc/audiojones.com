"use client";

const PILLARS = [
  {
    icon: "auto_awesome",
    title: "Personal Branding Authority",
    desc: "We help you build a powerful, authentic personal brand that positions you as the voice in your market.",
    bullets: ["Brand Strategy", "Content Creation", "Audience Growth"],
    cta: "Build Your Brand",
    href: "/services/personal-branding",
  },
  {
    icon: "movie",
    title: "Video Podcast Production",
    desc: "From concept to distribution, we run the full podcasting workflow to produce high-quality video and audio content.",
    bullets: ["Full-Service Production", "High-Quality Editing", "Distribution Strategy"],
    cta: "Launch Your Podcast",
    href: "/services/podcast",
  },
  {
    icon: "psychology",
    title: "AI Marketing Systems",
    desc: "Leverage AI to streamline content repurposing, lead generation, and marketing operations.",
    bullets: ["AI Automation", "Content Repurposing", "Lead Generation"],
    cta: "Automate Your Marketing",
    href: "/services/ai-marketing",
  },
];

export default function WhatWeBuildSection() {
  return (
    <section className="bg-[#0A0A0A] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          What We Build
        </h2>
        <p className="mt-4 text-base text-white/50 sm:text-lg">
          Three pillars to grow authority and revenue.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="group flex h-full flex-col rounded-2xl border border-white/5 bg-white/5 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#FFD700]/45"
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF4500]/15 text-2xl text-[#FFD700]">
                <span className="material-symbols-outlined">{pillar.icon}</span>
              </span>
              <h3 className="text-lg font-semibold text-white">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-white/60">{pillar.desc}</p>

              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {pillar.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1 h-5 w-5 rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] text-xs font-bold text-black flex items-center justify-center">
                      ✓
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <a
                href={pillar.href}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-5 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,69,0,0.35)] hover:brightness-110 transition"
              >
                {pillar.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}