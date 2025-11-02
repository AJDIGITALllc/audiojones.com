import IKImage from "@/components/IKImage";

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
            Build authority, automate growth, and amplify your voice from our studio serving South Florida leaders
            and entrepreneurs.
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
        <div className="flex items-center justify-center md:justify-end">
          <div
            className="relative flex h-[260px] w-[260px] items-center justify-center rounded-[2.75rem]
                       border border-white/10 bg-gradient-to-b from-[#FF4500] via-[#FF4500]/15 to-transparent
                       shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:h-[280px] sm:w-[280px] md:h-[340px] md:w-[340px]"
          >
            <div
              className="flex h-[210px] w-[210px] items-center justify-center overflow-hidden rounded-[2.4rem]
                         border border-white/10 bg-black/40 sm:h-[230px] sm:w-[230px] md:h-[280px] md:w-[280px]"
            >
              <IKImage
                src="/assets/AUDIO JONES WEBSITE IMAGES/hero/audiojones-portrait.png"
                alt="Audio Jones"
                width={600}
                height={600}
                className="h-full w-full object-cover object-center"
                priority
              />
            </div>
            <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-[#FF4500]/25 blur-3xl md:blur-[60px]" />
          </div>
        </div>
      </section>

      {/* Authority Metrics / AI Noise Section */}
      <section id="authority-metrics" className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <header className="mb-10 text-center sm:mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Stand Out in a World Flooded by AI Noise
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-white/80">
              57% of content is AI-drafted. Zero-click search keeps rising. Trust and visibility now require human
              leadership.
            </p>
          </header>

          {/* Stat Grid */}
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="stat-card rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm transition hover:bg-white/10">
              <dt className="sr-only">Consumers needing trust</dt>
              <dd className="stat-value bg-gradient-to-r from-[#FF4500] to-[#FFD700] bg-clip-text text-4xl text-transparent sm:text-5xl">
                81%
              </dd>
              <p className="stat-label mt-2 text-white/80">need trust before purchase</p>
            </div>

            <div className="stat-card rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm transition hover:bg-white/10">
              <dt className="sr-only">Pay more for trusted brands</dt>
              <dd className="stat-value bg-gradient-to-r from-[#FF4500] to-[#FFD700] bg-clip-text text-4xl text-transparent sm:text-5xl">
                87%
              </dd>
              <p className="stat-label mt-2 text-white/80">pay more for trusted brands</p>
            </div>

            <div className="stat-card rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm transition hover:bg-white/10">
              <dt className="sr-only">Zero-click searches</dt>
              <dd className="stat-value bg-gradient-to-r from-[#FF4500] to-[#FFD700] bg-clip-text text-4xl text-transparent sm:text-5xl">
                59%
              </dd>
              <p className="stat-label mt-2 text-white/80">searches end without a click</p>
            </div>

            <div className="stat-card rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm transition hover:bg-white/10">
              <dt className="sr-only">Trust in podcast hosts</dt>
              <dd className="stat-value bg-gradient-to-r from-[#FF4500] to-[#FFD700] bg-clip-text text-4xl text-transparent sm:text-5xl">
                74%
              </dd>
              <p className="stat-label mt-2 text-white/80">trust podcast hosts</p>
            </div>
          </dl>

          <p className="mx-auto mt-10 max-w-3xl text-center text-white/90">
            We combine personal branding, podcast storytelling, and AEO to make you recognizable and discoverable where
            decisions happen.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#book"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-8 font-bold text-black transition hover:opacity-90"
            >
              Book a Strategy Call
            </a>
          </div>
        </div>
      </section>

      {/* Scrolling Brand Logos */}
      <section id="brands" className="border-y border-white/10 bg-black py-10">
        <div className="mx-auto max-w-7xl overflow-hidden px-6">
          <h3 className="mb-6 text-center text-sm uppercase tracking-widest text-white/70">Trusted by Brands &amp; Partners</h3>
          <div className="relative">
            <div className="flex items-center gap-12 whitespace-nowrap will-change-transform animate-scroll">
              {/* Primary set */}
              <img
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/GOOGLE.png?updatedAt=1761672351007"
                alt="Google"
                className="h-8 opacity-70 transition hover:opacity-100"
              />
              <img
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/QUALITY%20CONTROL.png?updatedAt=1761672351054"
                alt="Quality Control"
                className="h-8 opacity-70 transition hover:opacity-100"
              />
              <img
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/UNIVERSAL%20MUSIC.png?updatedAt=1761672350908"
                alt="Universal Music"
                className="h-8 opacity-70 transition hover:opacity-100"
              />
              <img
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/THE%20ORCHARD.png?updatedAt=1761672350733"
                alt="The Orchard"
                className="h-8 opacity-70 transition hover:opacity-100"
              />
              <img
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/CAPITAL.png?updatedAt=1761672350877"
                alt="Capitol Records"
                className="h-8 opacity-70 transition hover:opacity-100"
              />
              <img
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/WE%20THE%20BEST.png?updatedAt=1761672350945"
                alt="We The Best"
                className="h-8 opacity-70 transition hover:opacity-100"
              />
              {/* Duplicate set for seamless loop */}
              <img
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/GOOGLE.png?updatedAt=1761672351007"
                alt="Google"
                className="h-8 opacity-70 transition hover:opacity-100"
              />
              <img
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/QUALITY%20CONTROL.png?updatedAt=1761672351054"
                alt="Quality Control"
                className="h-8 opacity-70 transition hover:opacity-100"
              />
              <img
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/UNIVERSAL%20MUSIC.png?updatedAt=1761672350908"
                alt="Universal Music"
                className="h-8 opacity-70 transition hover:opacity-100"
              />
              <img
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/THE%20ORCHARD.png?updatedAt=1761672350733"
                alt="The Orchard"
                className="h-8 opacity-70 transition hover:opacity-100"
              />
              <img
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/CAPITAL.png?updatedAt=1761672350877"
                alt="Capitol Records"
                className="h-8 opacity-70 transition hover:opacity-100"
              />
              <img
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/client%20logos/WE%20THE%20BEST.png?updatedAt=1761672350945"
                alt="We The Best"
                className="h-8 opacity-70 transition hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-[#111111] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h4 className="gradient-text text-sm font-bold uppercase tracking-widest">Client Results</h4>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Trusted by South Florida Leaders &amp; Creators
            </h2>
            <p className="mt-4 text-white/80">Real outcomes from entrepreneurs, artists, and brands we support.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm">
              <p className="text-white/90">
                “Within 60 days, our content pipeline and podcast drove inbound demos we couldn’t keep up with.”
              </p>
              <div className="mt-4 text-sm text-white/60">— Founder, Miami SAAS</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm">
              <p className="text-white/90">
                “Audio turned my story into a brand. Systems keep it publishing every week without me babysitting.”
              </p>
              <div className="mt-4 text-sm text-white/60">— Creator &amp; Host</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm">
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
            <div className="rounded-2xl bg-black p-8 text-center sm:p-12">
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to Build Your Studio System?</h3>
              <p className="mx-auto mt-3 max-w-2xl text-white/80">
                Book a strategy call and we’ll map your brand, podcast, and growth engine in one plan.
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <a
                  href="/book"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-8 font-bold text-black transition hover:opacity-90"
                >
                  Book a Call
                </a>
                <a
                  href="/services"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-8 font-bold text-white transition hover:bg-white/10"
                >
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Uploader CTA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
          <div>
            <h3 className="text-2xl font-bold">Need to upload assets?</h3>
            <p className="text-white/75">Use the uploader to push images directly to ImageKit.</p>
          </div>
          <a
            href="/uploader"
            className="rounded-full bg-white px-6 py-3 font-bold text-black transition hover:opacity-90"
          >
            Open Uploader
          </a>
        </div>
      </section>
    </main>
  );
}
