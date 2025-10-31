"use client";

import Link from "next/link";

const CASES = [
  {
    tag: "Podcast Studio Win",
    title: "Local founder turned 1 show into a weekly authority channel.",
    metric: "+62% audience engagement",
    bullets: [
      "Recorded at Circle House Studios",
      "Branded video podcast assets in 48 hrs",
      "Repurposed for YouTube + IG Reels"
    ],
    cta: "Read the breakdown",
    href: "/insights/case-studio-weekly-authority"
  },
  {
    tag: "Content Engine Win",
    title: "Creator collective scaled content without burning out.",
    metric: "4x output, same recording time",
    bullets: [
      "1 → many repurposing workflow",
      "Monthly strategy + analytics",
      "Social captions auto-generated"
    ],
    cta: "See how it works",
    href: "/insights/case-content-engine"
  },
  {
    tag: "AI Marketing Win",
    title: "Consultant automated follow-ups and bookings.",
    metric: "12+ hours saved monthly",
    bullets: [
      "AI-powered nurture + booking",
      "GBP + local visibility tuned",
      "Reporting sent to founder"
    ],
    cta: "View the automation",
    href: "/insights/case-ai-automation"
  }
];

export default function CaseStudiesSection() {
  return (
    <section className="bg-[#0A0A0A] py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-white">
              Real Results from Miami Leaders
            </h2>
            <p className="mt-2 text-sm text-white/60 md:text-base">
              These are the kinds of outcomes our studio systems are designed to create.
            </p>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 transition"
          >
            View all insights
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-2xl border border-white/5 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#FFD700]/45"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#FFD700]">
                {item.tag}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm font-medium text-white/60">{item.metric}</p>

              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {item.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={item.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FFD700] hover:text-white transition"
              >
                {item.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}