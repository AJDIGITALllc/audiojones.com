"use client";

export default function NoiseAuthoritySection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-16 sm:py-20">
      {/* glow backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,69,0,0.25),_rgba(10,10,10,0)_55%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 text-center">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Stand Out in a World Flooded by AI Noise
          </h2>
          <p className="text-base text-white/60 sm:text-lg">
            57% of content is AI-drafted. Zero-click search keeps rising. Trust
            and visibility now require human leadership.
          </p>
        </div>

        {/* stats */}
        <div className="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "81%", label: "need trust before purchase" },
            { value: "87%", label: "pay more for trusted brands" },
            { value: "59%", label: "searches end without a click" },
            { value: "74%", label: "trust podcast hosts" },
          ].map((item) => (
            <div
              key={item.value}
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm transition hover:border-[#FFD700]/60"
            >
              <p className="bg-gradient-to-r from-[#FF4500] to-[#FFD700] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
                {item.value}
              </p>
              <p className="text-sm font-medium leading-normal text-white/70 sm:text-base">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* body + CTAs */}
        <div className="max-w-3xl space-y-6">
          <p className="text-base text-white/70 sm:text-lg">
            We combine personal branding, podcast storytelling, and AEO to make
            you recognizable and discoverable where decisions happen.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-8 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(255,69,0,0.35)] transition hover:brightness-110"
            >
              Book a Strategy Call
            </a>
            <a
              href="/insights"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-8 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/5"
            >
              See how we build authority
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}