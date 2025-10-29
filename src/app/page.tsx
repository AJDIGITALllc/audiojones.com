import Image from "next/image";
import ImageKitUploader from "@/components/ImageKitUploader";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111] text-white">
      <Hero />

      {/* Authority Metrics / AI Noise Section */}
      <section id="authority-metrics" className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <header className="text-center mb-10 sm:mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Stand Out in a World Flooded by AI Noise
            </h2>
            <p className="mt-4 text-white/80 max-w-3xl mx-auto">
              57% of content is AI-drafted. Zero-click search keeps rising. Trust and visibility now require
              human leadership.
            </p>
          </header>

          {/* Stat Grid */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stat-card rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg hover:bg-white/10 transition">
              <dt className="sr-only">Consumers needing trust</dt>
              <dd className="stat-value text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#FF4500] to-[#FFD700] bg-clip-text text-transparent">81%</dd>
              <p className="stat-label mt-2 text-white/80">need trust before purchase</p>
            </div>

            <div className="stat-card rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg hover:bg-white/10 transition">
              <dt className="sr-only">Pay more for trusted brands</dt>
              <dd className="stat-value text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#FF4500] to-[#FFD700] bg-clip-text text-transparent">87%</dd>
              <p className="stat-label mt-2 text-white/80">pay more for trusted brands</p>
            </div>

            <div className="stat-card rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg hover:bg-white/10 transition">
              <dt className="sr-only">Zero-click searches</dt>
              <dd className="stat-value text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#FF4500] to-[#FFD700] bg-clip-text text-transparent">59%</dd>
              <p className="stat-label mt-2 text-white/80">searches end without a click</p>
            </div>

            <div className="stat-card rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg hover:bg-white/10 transition">
              <dt className="sr-only">Trust in podcast hosts</dt>
              <dd className="stat-value text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#FF4500] to-[#FFD700] bg-clip-text text-transparent">74%</dd>
              <p className="stat-label mt-2 text-white/80">trust podcast hosts</p>
            </div>
          </dl>

          <p className="mt-10 text-center text-white/90 max-w-3xl mx-auto">
            We combine personal branding, podcast storytelling, and AEO to make you recognizable and
            discoverable where decisions happen.
          </p>

          <div className="mt-8 flex justify-center">
            <a href="#book"
               className="inline-flex h-12 items-center justify-center rounded-full px-8 font-bold text-black bg-gradient-to-r from-[#FF4500] to-[#FFD700] hover:opacity-90 transition">
              Book a Strategy Call
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}




