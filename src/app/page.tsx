import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111] text-white">
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-20 lg:grid-cols-2">
        {/* Left: Copy */}
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-300/80">
            South Florida Leaders & Creators
          </p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            Miami Consultant for Personal Branding, Podcast Production, and AI Marketing Systems
          </h1>
          <p className="text-lg text-white/75">
            Build authority, automate growth, and amplify your voice from our studio serving South Florida leaders and entrepreneurs.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#book"
              className="rounded-full px-6 py-3 font-bold text-black shadow-[0_4px_20px_rgba(255,215,0,0.35)]
                         bg-[linear-gradient(135deg,#FF4500,#FFD700)]
                         hover:bg-[linear-gradient(135deg,#FFD700,#FF4500)] transition"
            >
              Book a Consultation
            </a>
            <a
              href="#reel"
              className="rounded-full border border-white/25 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Watch How We Build Authority
            </a>
          </div>
        </div>

        {/* Right: Portrait */}
        <div className="flex items-start justify-center lg:justify-end">
          <Image
            src="/assets/audio-jones-hero.webp"
            alt="Audio Jones — Miami brand consultant and AI marketing expert"
            width={540}
            height={675} // ~4:5
            priority
            className="rounded-2xl shadow-[0_0_30px_rgba(255,69,0,0.35)]"
          />
        </div>
      </section>
    </main>
  );
}
<ServicesPillars />
