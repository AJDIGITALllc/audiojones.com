"use client";

const PROBLEMS = [
  "Sporadic publishing leads to a forgotten presence.",
  "Growth stays slow and inconsistent despite effort.",
  "It’s hard to build authority and trust over time.",
  "You miss the compound effect of ongoing engagement.",
];

const STEPS = [
  {
    title: "Step 1 — Studio Workflow",
    desc: "Record once inside a streamlined, high-quality podcast + video flow.",
  },
  {
    title: "Step 2 — Repurposed Clips",
    desc: "Turn that single recording into weeks of social content, shorts, and carousels.",
  },
  {
    title: "Step 3 — AI Systems",
    desc: "Use AI to schedule, distribute, and follow up — so consistency isn’t on you.",
  },
];

export default function ContentBlockersSection() {
  return (
    <section className="bg-[#0A0A0A] py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 flex flex-col lg:flex-row gap-12">
        {/* LEFT: Problem / Agitation */}
        <div className="lg:w-1/2">
          <p className="text-sm font-bold uppercase text-[#FF4500]">THE REAL BLOCKERS</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mt-4">
            Consistency beats virality. Publish weekly, grow steadily.
          </h1>
          <p className="text-lg text-white/70 mt-6">
            Many leaders chase fleeting trends, but real influence is built from a predictable content rhythm. Without a reliable publishing and repurposing system, your growth stalls, your audience forgets you, and your long-term authority never compounds.
          </p>
          <ul className="space-y-4 pt-8">
            {PROBLEMS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF4500]/10 text-[#FF4500]">
                  <span className="material-symbols-outlined text-base">error</span>
                </span>
                <p className="text-base text-white/75">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: 3-Step System */}
        <div className="lg:w-1/2 space-y-4">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#FFD700]/50"
            >
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-white/60">{step.desc}</p>
            </div>
          ))}

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <a
              href="/book"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-8 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(255,69,0,0.35)] hover:brightness-110 transition"
            >
              Fix My Content Bottleneck
            </a>
            <a
              href="/insights/content-system"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-white/10 px-8 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 transition"
            >
              See the 3-Step System
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
