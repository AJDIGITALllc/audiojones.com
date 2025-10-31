"use client";

const STEPS = [
  {
    number: "1",
    title: "Launch Your Podcast",
    desc: "Launch a powerful video podcast with a clear strategy that connects with your South Florida audience and establishes your authority.",
  },
  {
    number: "2",
    title: "Repurpose Content",
    desc: "Repurpose each episode into micro-content — clips, quotes, and articles — perfectly formatted for every social platform.",
  },
  {
    number: "3",
    title: "Automate & Scale",
    desc: "Automate your distribution and lead capture using our custom AI marketing systems to grow your brand on autopilot.",
  },
];

export default function ThreeStepSystem() {
  return (
    <section className="bg-[#0A0A0A] py-16 sm:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6">
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#FF4500]">
            THE SYSTEM
          </p>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            Launch, Repurpose, and Automate — Your Content Engine in 3 Steps.
          </h2>
          <p className="mx-auto max-w-3xl text-base text-white/60 sm:text-lg">
            Turn one recording into a full month of branded content with our
            proven system designed for Miami’s top entrepreneurs and leaders.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="flex flex-col gap-4 border-b border-white/10 pb-8 last:border-none"
            >
              <div className="flex gap-5 items-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF4500] to-[#FFD700] text-2xl font-bold text-black">
                  {step.number}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                  <p className="text-base text-white/65">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="/book"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-6 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(255,69,0,0.35)] hover:brightness-110 transition"
          >
            Book Your Strategy Call
          </a>
          <a
            href="/services"
            className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/5 transition"
          >
            See Packages
          </a>
        </div>
      </div>
    </section>
  );
}