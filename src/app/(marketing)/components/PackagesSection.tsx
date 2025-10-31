"use client";

import React from "react";

const PACKAGES = [
  {
    name: "Starter: Brand Foundation",
    price: "From $2,500",
    tagline: "Build your message, visuals, and presence from the ground up.",
    features: [
      "Brand Strategy Workshop",
      "Audience Persona Development",
      "Content Pillar Identification",
      "Basic Media Kit",
    ],
    cta: "Get Started",
    href: "/book?plan=starter",
    highlight: false,
    variant: "dark",
  },
  {
    name: "Growth: Content Engine Monthly",
    price: "From $5,000/mo",
    tagline:
      "Full-service podcast + content repurposing to grow your brand authority.",
    features: [
      "2–4 Podcast Episodes/Month",
      "AI-Powered Content Repurposing",
      "Social Media Clip Creation",
      "Monthly Strategy + Analytics",
      "Guest Outreach & Coordination",
    ],
    cta: "Start Growing",
    href: "/book?plan=growth",
    highlight: true,
    variant: "gradient",
  },
  {
    name: "Scale: AI Marketing Partner",
    price: "Custom",
    tagline:
      "For brands ready to automate marketing, production, and data systems.",
    features: [
      "Everything in Growth, plus:",
      "AI-Driven Ad Campaigns",
      "Personalized Email Automation",
      "Advanced Performance Analytics",
      "Dedicated Brand Strategist",
    ],
    cta: "Book a Discovery Call",
    href: "/book?plan=custom",
    highlight: false,
    variant: "outline",
  },
];

export default function PackagesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Choose Your Growth Path
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-white/70">
          Whether you’re just getting started or ready to scale your studio, our
          systems help you grow with clarity, content, and consistency.
        </p>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`flex h-full flex-col rounded-2xl border bg-white/5 p-6 text-left transition-all hover:border-[#FFD700]/50 ${
                pkg.highlight
                  ? "border-[#FFD700]/70 shadow-[0_0_40px_rgba(255,215,0,0.25)] lg:-mt-4"
                  : "border-white/5"
              }`}
            >
              <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
              <p className="mt-1 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF4500] to-[#FFD700]">
                {pkg.price}
              </p>
              <p className="mt-2 text-sm text-white/70">{pkg.tagline}</p>
              <ul className="mt-6 space-y-3 text-sm text-white/80">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1 h-5 w-5 rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] text-[10px] font-bold text-black flex items-center justify-center">
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                {pkg.variant === "gradient" && (
                  <a
                    href={pkg.href}
                    className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-6 py-3 text-sm font-semibold text-black hover:brightness-110 transition"
                  >
                    {pkg.cta}
                  </a>
                )}
                {pkg.variant === "dark" && (
                  <a
                    href={pkg.href}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition"
                  >
                    {pkg.cta}
                  </a>
                )}
                {pkg.variant === "outline" && (
                  <a
                    href={pkg.href}
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/5 transition"
                  >
                    {pkg.cta}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-white/40">
            On-site recording available at 13700 NW 1st Ave, Miami, FL 33168.
          </p>
        </div>
      </div>
    </section>
  );
}