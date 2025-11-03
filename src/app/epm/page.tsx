import Image from "next/image";
import type { Metadata } from "next";
import { CTA_LINKS, EPM_STREAMS, COMING_SOON_CAPABILITIES } from "@/config/marketing";
import { ComingSoonCard } from "@/components/shared/ComingSoonCard";
import { EpmWaitlistForm } from "@/components/forms/EpmWaitlistForm";

export const metadata: Metadata = {
  title: "Emotional Predictive Marketing (EPM) | Audio Jones",
  description:
    "Discover the Audio Jones EPM framework—predictive content intelligence, automation blueprints, and revenue attribution for creators and brands.",
  openGraph: {
    title: "Emotional Predictive Marketing (EPM) | Audio Jones",
    description: "Join the waitlist for upcoming EPM modules that connect data, automation, and AI optimization.",
    url: "https://audiojones.com/epm",
  },
};

export default function EpmPage() {
  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/Backgrounds/Audio_Jones_Website_Backgrounds_%20(5).png?updatedAt=1761600049689"
            alt="Audio Jones EPM backdrop"
            fill
            className="object-cover object-center opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-[#008080]/40" aria-hidden />
        </div>
        <div className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center gap-6 px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#FFD700]">Emotional Predictive Marketing</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Predict your best-performing content before you hit publish.
          </h1>
          <p className="max-w-3xl text-lg text-white/80">
            The Audio Jones EPM framework blends emotional signal analysis, automation blueprints, and revenue attribution so every campaign is engineered for traction and sales.
          </p>
          <a
            href={CTA_LINKS.epmWaitlist}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-8 py-3 text-sm font-semibold text-black shadow-lg shadow-[#FF4500]/40 transition hover:scale-105"
          >
            Join the Waitlist
          </a>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#050505]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FFD700]">Core Streams</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold">What launches with EPM</h2>
            <p className="mt-4 text-lg text-white/70">
              Each module feeds MailerLite, n8n, Whop, and Data Studio—built for automation-first marketing teams.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {EPM_STREAMS.map((stream) => (
              <article key={stream.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#008080]/40 bg-[#008080]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#00d5d5]">
                  {stream.status}
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{stream.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">{stream.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20" style={{ background: "linear-gradient(135deg, #050505 0%, #120026 100%)" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FF4500]">Coming Soon</p>
            <h2 className="mt-4 text-3xl font-bold">Next-up capabilities inside the EPM roadmap</h2>
            <p className="mt-4 text-lg text-white/70">We’re shipping in sprints with partner clients. Get early access insights from the private beta.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {COMING_SOON_CAPABILITIES.map((capability) => (
              <ComingSoonCard
                key={capability.title}
                title={capability.title}
                description={capability.description}
                statusLabel={capability.statusLabel}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="epm-waitlist" className="relative py-20">
        <div className="absolute inset-0 bg-[#040404]" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#FFD700]">Waitlist</p>
          <h2 className="mt-4 text-3xl font-bold">Be first to activate EPM inside your marketing engine</h2>
          <p className="mt-4 text-white/70">
            Tag: <span className="font-semibold text-white">epm_waitlist</span>. We’ll send playbooks, automation recipes, and beta invites as the modules go live.
          </p>
          <div className="mt-8 rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur">
            <EpmWaitlistForm />
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0 bg-[#050505]" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Automation-first",
                description: "Every workflow syncs MailerLite, n8n, Whop, and Sheets to keep the data layer humming.",
              },
              {
                title: "Data-driven",
                description: "EPM hooks into the Audio Jones Data Intelligence Module for live attribution dashboards.",
              },
              {
                title: "AI-optimized",
                description: "AI prompts and optimization loops ensure creatives and offers adapt to audience sentiment in real time.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-white/70">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
