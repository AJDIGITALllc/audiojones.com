import IKImage from "@/components/IKImage";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111] text-white">
      <section className="relative mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="flex items-center justify-center">
          <img
            src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIOJONES_HERO_IMAGE_03.svg?tr=q-90"
            alt="Audio Jones — AI Marketing & Automation"
            className="w-full h-[520px] md:h-[640px] object-cover object-center rounded-2xl"
            width="1600"
            height="900"
            loading="eager"
            decoding="async"
          />
        </div>
      </section>

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

      {/* Scrolling Brand Logos */}
      <section id="brands" className="bg-black py-10 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-center text-white/70 text-sm tracking-widest mb-6 uppercase">Trusted by Brands & Partners</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
            <img src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/GOOGLE.png?updatedAt=1761672351007" alt="Google" className="h-8 md:h-10 lg:h-12 w-auto opacity-80 hover:opacity-100 transition" loading="lazy" decoding="async" width="140" height="48" />
            <img src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/QUALITY%20CONTROL.png?updatedAt=1761672351054" alt="Quality Control" className="h-8 md:h-10 lg:h-12 w-auto opacity-80 hover:opacity-100 transition" loading="lazy" decoding="async" width="140" height="48" />
            <img src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/UNIVERSAL%20MUSIC.png?updatedAt=1761672350908" alt="Universal Music" className="h-8 md:h-10 lg:h-12 w-auto opacity-80 hover:opacity-100 transition" loading="lazy" decoding="async" width="140" height="48" />
            <img src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/THE%20ORCHARD.png?updatedAt=1761672350733" alt="The Orchard" className="h-8 md:h-10 lg:h-12 w-auto opacity-80 hover:opacity-100 transition" loading="lazy" decoding="async" width="140" height="48" />
            <img src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/CAPITAL.png?updatedAt=1761672350877" alt="Capitol Records" className="h-8 md:h-10 lg:h-12 w-auto opacity-80 hover:opacity-100 transition" loading="lazy" decoding="async" width="140" height="48" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-[#111111] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h4 className="text-sm font-bold uppercase tracking-widest gradient-text">Client Results</h4>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Trusted by South Florida Leaders & Creators</h2>
            <p className="mt-4 text-white/80">Real outcomes from entrepreneurs, artists, and brands we support.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg">
              <p className="text-white/90">“Within 60 days, our content pipeline and podcast drove inbound demos we couldn’t keep up with.”</p>
              <div className="mt-4 text-sm text-white/60">— Founder, Miami SAAS</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg">
              <p className="text-white/90">“Audio turned my story into a brand. Systems keep it publishing every week without me babysitting.”</p>
              <div className="mt-4 text-sm text-white/60">— Creator & Host</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg">
              <p className="text-white/90">“The studio system plus YouTube strategy made our team look and sound like pros.”</p>
              <div className="mt-4 text-sm text-white/60">— Media Director</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#FF4500] to-[#FFD700] p-[1px]">
            <div className="rounded-2xl bg-black p-8 sm:p-12 text-center">
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to Build Your Studio System?</h3>
              <p className="mt-3 text-white/80 max-w-2xl mx-auto">Book a strategy call and we’ll map your brand, podcast, and growth engine in one plan.</p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <a href="/book" className="inline-flex h-12 items-center justify-center rounded-full px-8 font-bold text-black bg-gradient-to-r from-[#FF4500] to-[#FFD700] hover:opacity-90 transition">Book a Call</a>
                <a href="/services" className="inline-flex h-12 items-center justify-center rounded-full px-8 font-bold border border-white/20 text-white hover:bg-white/10 transition">Explore Services</a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}




