import type { Metadata } from "next";
import { ARTIST_SERVICE_MATRIX, ARTIST_TESTIMONIALS, CTA_LINKS } from "@/config/marketing";
import { ServiceTile } from "@/components/shared/ServiceTile";
import { ArtistLeadMagnetForm } from "@/components/forms/ArtistLeadMagnetForm";

export const metadata: Metadata = {
  title: "Artist Hub | Audio Jones",
  description:
    "Build your sound, brand, and legacy with Audio Jones. Book music production, branding, marketing, automation, and strategy services powered by Whop + MailerLite automations.",
  openGraph: {
    title: "Artist Hub | Audio Jones",
    description: "Artist services built for independence, powered by automation.",
    url: "https://audiojones.com/artist-hub",
  },
};

export default function ArtistHubPage() {
  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
            poster="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIO%20JONES%20HERO%20IMAGE%20%20(1).webp?updatedAt=1762104789649"
          >
            <source src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/video/artist-hub-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-[#FF4500]/40" aria-hidden />
        </div>
        <div className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center gap-6 px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#FFD700]">Artist Hub</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Build Your Sound. Brand. Legacy.
          </h1>
          <p className="max-w-3xl text-lg text-white/80">
            Where creativity meets strategy. Audio Jones pairs studio production, design, and automation so independent artists can launch, grow, and monetize with confidence.
          </p>
          <a
            href="#services"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-8 py-3 text-sm font-semibold text-black shadow-lg shadow-[#FF4500]/40 transition hover:scale-105"
          >
            Explore Artist Services
          </a>
        </div>
      </section>

      <section id="services" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0B0B0B]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FFD700]">Artist Services Overview</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold">Five ways Audio Jones powers your releases</h2>
            <p className="mt-4 text-lg text-white/70">
              Every offer connects to Whop for checkout and MailerLite for nurture so you stay focused on creating.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ARTIST_SERVICE_MATRIX.map((service, index) => (
              <ServiceTile
                key={service.id}
                title={service.title}
                description={service.description}
                ctaHref={service.ctaHref}
                ctaLabel={service.ctaLabel}
                accent={index % 2 === 0 ? "orange" : "teal"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0 bg-[#050505]" aria-hidden />
        <div className="relative mx-auto flex max-w-5xl flex-col gap-10 px-6 lg:flex-row lg:items-start">
          <div className="w-full space-y-6">
            <h2 className="text-3xl font-bold">Preview the Audio Jones Production Player</h2>
            <p className="text-lg text-white/70">
              Tap into beats, demos, and production packs curated for release-ready artists. Save favourites, then lock in your session or license with one click.
            </p>
            <a
              href={CTA_LINKS.artistServices.browseBeats}
              className="inline-flex items-center justify-center rounded-full bg-[#008080] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#009999]"
            >
              Browse Beats on Whop
            </a>
          </div>
          <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
            <iframe
              title="Audio Jones Beat Player"
              src="https://player.beatstars.com/?storeId=119605"
              className="h-[420px] w-full"
              allow="autoplay"
            />
          </div>
        </div>
      </section>

      <section className="relative py-20" style={{ background: "linear-gradient(180deg, #080808 0%, #020202 100%)" }}>
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold">Artist Support Services</h2>
          <p className="mt-3 text-lg text-white/70">
            Plug into creative add-ons and physical studio resources to complete your rollout.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              "Artwork Design",
              "Mixing & Mastering",
              "Studio Time (Miami, FL)",
              "Video Shoots / Photoshoots",
            ].map((item) => (
              <article key={item} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-lg font-semibold">{item}</p>
                <p className="mt-2 text-sm text-white/70">
                  Request an estimate tailored to your release timeline and promotion plan.
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <a
              href={CTA_LINKS.artistStudioBooking}
              className="inline-flex items-center justify-center rounded-full border border-[#FFD700]/40 bg-[#FFD700]/10 px-6 py-3 text-sm font-semibold text-[#FFD700] transition hover:border-[#FFD700]"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      <section className="relative py-20" style={{ background: "linear-gradient(135deg, #0b0b0b 0%, #080024 100%)" }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#FFD700]">Lead Magnet</p>
          <h2 className="mt-4 text-3xl font-bold">Download the 2026 Single Release Checklist</h2>
          <p className="mt-4 text-white/70">
            Join the MailerLite sequence tagged <span className="font-semibold text-white">freemium_artist_checklist</span> and unlock the release blueprint we use with every Audio Jones artist.
          </p>
          <div className="mt-8 rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur">
            <ArtistLeadMagnetForm />
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0 bg-[#0B0B0B]" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FF4500]">Testimonials</p>
            <h2 className="mt-4 text-3xl font-bold">Creators who trust the Audio Jones ecosystem</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ARTIST_TESTIMONIALS.map((testimonial) => (
              <article key={testimonial.name} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
                <div
                  className="h-16 w-16 rounded-full border border-[#FFD700]/40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${testimonial.image})` }}
                  aria-hidden
                />
                <blockquote className="mt-6 text-base text-white/80">“{testimonial.quote}”</blockquote>
                <p className="mt-4 text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="text-xs text-white/50">{testimonial.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20" style={{ background: "linear-gradient(135deg, #050505 0%, #1a1a1a 100%)" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4500]/10 via-transparent to-[#FFD700]/10" aria-hidden />
        <div className="relative mx-auto flex max-w-5xl flex-col gap-10 px-6 lg:flex-row lg:items-center">
          <div className="w-full space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#FFD700]">Artist Network</p>
            <h2 className="text-3xl font-bold">Join the Audio Jones Artist Network</h2>
            <p className="text-lg text-white/70">
              Connect, collaborate, and grow with artists plugged into the Marketing Automation, Data Intelligence, and AI Optimization modules.
            </p>
            <a
              href={CTA_LINKS.artistNetwork}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-8 py-3 text-sm font-semibold text-black shadow-lg transition hover:scale-105"
            >
              Unlock Membership on Whop
            </a>
          </div>
          <div className="w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <iframe
              className="h-[315px] w-full"
              src="https://www.youtube.com/embed/ysz5S6PUM-U"
              title="Audio Jones Artist Network"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
