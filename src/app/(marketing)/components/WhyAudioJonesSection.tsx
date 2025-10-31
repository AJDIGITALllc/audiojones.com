"use client";

const POINTS = [
  {
    icon: "movie",
    title: "Studio-Grade Production",
    desc: "Record on-site at 13700 NW 1st Ave, Miami, FL 33168. We handle the gear, you just show up.",
  },
  {
    icon: "autorenew",
    title: "Content Engine, Not One-Offs",
    desc: "Every recording is repurposed into clips, carousels, and articles to maximize your reach.",
  },
  {
    icon: "psychology",
    title: "AI + AEO Baked In",
    desc: "Metadata, transcripts, and local signals are optimized to capture South Florida search intent.",
  },
  {
    icon: "hub",
    title: "Automation + Client Portals",
    desc: "We wire up n8n, Make, and Zapier to streamline approvals and provide a dedicated client portal.",
  },
];

export default function WhyAudioJonesSection() {
  return (
    <section className="bg-[#0A0A0A] border-t border-white/5 py-16 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-center">
        {/* LEFT: content + cards */}
        <div className="flex-1 order-2 lg:order-1">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#FF4500]">
            WHY AUDIO JONES
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            Built for creators, consultants, and culture-first brands.
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg max-w-2xl">
            We operate out of Miami’s creative corridor at Circle House Studios — combining real production with AI-driven marketing so you don’t have to juggle five different vendors.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {POINTS.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl bg-white/5 p-5 text-left border border-white/5 hover:border-[#FFD700]/45 transition"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF4500]/15 text-[#FFD700]">
                  <span className="material-symbols-outlined text-xl">
                    {item.icon}
                  </span>
                </span>
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-white/65">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-10 py-4 text-sm font-semibold text-black shadow-[0_0_26px_rgba(255,69,0,0.35)] hover:brightness-110 transition"
            >
              Book a Strategy Call
            </a>
          </div>
        </div>

        {/* RIGHT: founder image */}
        <div className="flex-1 order-1 lg:order-2">
          <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#FF4500]/10 to-transparent p-3 shadow-[0_0_40px_rgba(255,69,0,0.25)]">
            <div className="rounded-2xl bg-black/40 p-2">
              <img
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/audio-jones-hero.webp?updatedAt=1761600049033"
                alt="A portrait of Audio Jones, founder of the company, in a studio setting."
                className="h-full w-full rounded-2xl object-cover"
                loading="lazy"
                width={600}
                height={800}
              />
            </div>
            {/* glow pill */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur">
              Audio Jones • AI Marketing & Podcast Studio
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}