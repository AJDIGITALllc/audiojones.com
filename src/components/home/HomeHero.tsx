import Image from "next/image";
import { CTA_LINKS } from "@/config/marketing";

const heroStats = [
  { label: "Studio Systems Deployed", value: "120+" },
  { label: "Avg. Lift in Engagement", value: "340%" },
  { label: "Automation Touchpoints", value: "25+" },
];

const differentiators = [
  "Entity-based 2025 service matrix",
  "AI + automation baked into delivery",
  "South Florida studio & remote production",
];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Image
          src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIO%20JONES%20HERO%20IMAGE%20%20(1).webp?updatedAt=1762104789649"
          alt="Audio Jones studio environment"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-[#FF4500]/30" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center gap-14 px-6 py-28 lg:flex-row lg:items-center lg:px-12">
        <div className="w-full max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#FFD700]">
            2025 Service Matrix
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            AI, Media, and Marketing systems engineered by Audio Jones for leaders who need predictable growth.
          </h1>
          <p className="text-lg leading-relaxed text-white/80">
            AJ DIGITAL LLC blends studio-grade production, AI automation, and data intelligence so your brand shows up everywhere—podcasts, socials, email, and offers—without burning out your team.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-white/70">
            {differentiators.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FF4500]/20 text-[#FFD700]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={CTA_LINKS.bookStrategy}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-8 py-4 text-base font-bold text-black shadow-lg shadow-[#FF4500]/40 transition hover:scale-105"
            >
              Book a Strategy Call
            </a>
            <a
              href={CTA_LINKS.servicesOverview}
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Explore Services
            </a>
          </div>
        </div>

        <div className="w-full max-w-md rounded-3xl border border-white/15 bg-black/60 p-8 backdrop-blur">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60">System Signals</h2>
          <div className="mt-6 space-y-5">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-none last:pb-0">
                <div className="text-xs uppercase tracking-widest text-white/50">{stat.label}</div>
                <div className="text-2xl font-bold text-[#FFD700]">{stat.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-[#008080]/10 p-5 text-sm text-white/80">
            Miami-built systems powering creators, consultants, and studios across the Audio Jones network.
          </div>
        </div>
      </div>
    </section>
  );
}
