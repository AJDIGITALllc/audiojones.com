export default function ProblemAgitationSection() {
  const blockers = [
    "Sporadic publishing leads to forgotten presence.",
    "Slow, inconsistent growth despite best efforts.",
    "Struggling to build authority and trust over time.",
    "Missing the compound effect of continuous engagement.",
  ];

  return (
    <section
      id="real-blockers"
      className="relative overflow-hidden py-20"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/Backgrounds/Audio_Jones_Website_Backgrounds_%20(10).png?updatedAt=1761600050213')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-6 text-white">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#FFD700]">The Real Blockers</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
            Consistency beats virality. Predictable systems beat random wins.
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Leaders know they need to publish weekly—but without a system, content velocity collapses. Audio Jones removes the friction so momentum never stalls.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {blockers.map((item) => (
            <article
              key={item}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 text-left shadow-lg shadow-black/20"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4500]/20 text-2xl">⚡</div>
              <p className="mt-4 text-base text-white/80">{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
