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
            Miami Consultant for AEO, Local SEO & Google Business Optimization
          </h1>
          <p className="text-lg text-white/75">
            Rank your business in Miami, Fort Lauderdale & Fort Myers with optimized Google Business Profiles and AEO-powered local search strategies.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://cal.com/audiojones/strategy"
              className="rounded-full px-6 py-3 font-bold text-black shadow-[0_4px_20px_rgba(255,215,0,0.35)]
                         bg-[linear-gradient(135deg,#FF4500,#FFD700)]
                         hover:bg-[linear-gradient(135deg,#FFD700,#FF4500)] transition"
            >
              Book AEO/SEO Strategy Call
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/25 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              View Local SEO Packages
            </a>
          </div>
        </div>

        {/* Right: Portrait */}
        <div className="flex items-start justify-center lg:justify-end">
          <IKImage
            src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIOJONES_HERO_IMAGE_03.svg?tr=q-90"
            alt="Audio Jones — Miami AEO & Local SEO expert"
            width={540}
            height={675} // ~4:5
            priority
            className="rounded-2xl shadow-[0_0_30px_rgba(255,69,0,0.35)]"
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

      {/* Seamless Logo Marquee */}
      <section className="w-full bg-black py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-[0.65rem] tracking-[0.4em] text-white/40 uppercase mb-6">
            Trusted by Brands & Partners
          </p>
          <div className="relative overflow-hidden">
            <div className="flex gap-12 animate-[marquee_28s_linear_infinite]">
              {[
                "/assets/Icons/AUDIO_JONES_AI _SYSTEMS_ICON.png",
                "/assets/Icons/AUDIO_JONES_PERSONAL BRAND_ICON.png",
                "/assets/Icons/AUDIO_JONES_SERVICES_ICON.png",
                "/assets/Icons/AUDIO_JONES_WORKFLOW_ICON.png",
                "/assets/Icons/AUDIO_JONES_VIDEO_ICON.png",
                "/assets/Icons/AUDIO_JONES_EMAIL_ICON.png",
                "/assets/Icons/AUDIO_JONES_AI_CHATBOT_ICON.png",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Audio Jones service icon"
                  className="h-10 md:h-12 opacity-80 hover:opacity-100 transition"
                />
              ))}
              {[
                "/assets/Icons/AUDIO_JONES_AI _SYSTEMS_ICON.png",
                "/assets/Icons/AUDIO_JONES_PERSONAL BRAND_ICON.png",
                "/assets/Icons/AUDIO_JONES_SERVICES_ICON.png",
                "/assets/Icons/AUDIO_JONES_WORKFLOW_ICON.png",
                "/assets/Icons/AUDIO_JONES_VIDEO_ICON.png",
                "/assets/Icons/AUDIO_JONES_EMAIL_ICON.png",
                "/assets/Icons/AUDIO_JONES_AI_CHATBOT_ICON.png",
              ].map((src, i) => (
                <img
                  key={`dup-${i}`}
                  src={src}
                  alt="Audio Jones service icon"
                  className="h-10 md:h-12 opacity-80 hover:opacity-100 transition"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Results */}
      <section id="results" className="bg-[#101010] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-[0.6rem] tracking-[0.4em] uppercase text-[#FFD700]/80 mb-3">
            Client Results
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            South Florida Brands Getting Found
          </h2>
          <p className="text-white/60 mb-10 max-w-3xl">
            Local SEO + AEO + Google Business optimization for creators, consultants, and studios.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-white/5 bg-black/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <img src="/assets/Client Testiomonials/MIKE_KEEGAN_IMAGE_PROFILE_2025.png" alt="Mike Keegan, Miami SaaS Founder" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-white">Mike Keegan</p>
                  <p className="text-xs text-white/40">B2B Service • Miami</p>
                </div>
              </div>
              <p className="text-sm text-white/80 mb-4">
                &quot;Within 45 days we started getting GBP calls — not just traffic. The automation pushed leads into our CRM right away.&quot;
              </p>
              <p className="text-[0.7rem] text-white/30">Service: Local SEO + GBP + Automation</p>
            </article>
            <article className="rounded-2xl border border-white/5 bg-black/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <img src="/assets/Client Testiomonials/KFOXX_IMAGE_PROFILE_2025.png" alt="KFoxx, Creator & Podcast Host" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-white">KFoxx</p>
                  <p className="text-xs text-white/40">Media • Fort Lauderdale</p>
                </div>
              </div>
              <p className="text-sm text-white/80 mb-4">
                &quot;Audio Jones rebuilt our studio site and mapped the podcast content to search. Now clips, shorts, and GBP all match.&quot;
              </p>
              <p className="text-[0.7rem] text-white/30">Service: AEO + Content Mapping</p>
            </article>
            <article className="rounded-2xl border border-white/5 bg-black/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <img src="/assets/Client Testiomonials/TYLAN_IMAGE_PROFILE_2025.png" alt="Tylan, Media Director" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-white">Tylan</p>
                  <p className="text-xs text-white/40">Agency Partner • Remote</p>
                </div>
              </div>
              <p className="text-sm text-white/80 mb-4">
                &quot;We plugged AJ&apos;s GBP playbook into a client&apos;s campaign and it outperformed our paid social in 30 days.&quot;
              </p>
              <p className="text-[0.7rem] text-white/30">Service: GBP Playbook + Reporting</p>
            </article>
          </div>
        </div>
      </section>

      {/* AEO/SEO CTA Section */}
      <section className="w-full py-16 md:py-20 bg-[#0f0f0f]">
        <div className="mx-auto max-w-5xl rounded-2xl border border-[#FF4500]/50 bg-black/60 px-6 py-12 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <p className="text-xs tracking-[0.35em] text-orange-200 uppercase mb-3">
            Audio Jones • Local Growth Engine
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Ready to Rank Your Business in Miami, Fort Lauderdale & Fort Myers?
          </h2>
          <p className="text-sm md:text-base text-white/70 mb-8">
            We set up & optimize your Google Business Profile, fix local AEO/SEO issues,
            and build an automation stack that turns searches into booked calls.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://cal.com/audiojones/strategy"
              className="inline-flex items-center justify-center rounded-full bg-[#FF4500] px-6 py-3 text-sm font-semibold text-black hover:brightness-110 transition"
            >
              Book AEO/SEO Strategy Call
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              View Local SEO Packages
            </a>
          </div>
          <p className="text-[11px] text-white/40 mt-5">
            Miami • Doral • Fort Lauderdale • Fort Myers • Remote
          </p>
        </div>
      </section>

      {/* AEO/SEO FAQ Section */}
      <section id="faq" className="bg-black py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-white mb-6">AEO / Local SEO FAQ</h2>
          <div className="space-y-4">
            <details className="group rounded-xl border border-white/5 bg-[#111]/70 p-4">
              <summary className="flex cursor-pointer items-center justify-between text-white">
                <span>What&apos;s the difference between AEO and SEO?</span>
                <span className="text-white/30 group-open:rotate-180 transition">⌄</span>
              </summary>
              <p className="mt-3 text-sm text-white/60">
                SEO targets search engines. AEO targets answer-based systems (AI Overviews, Gemini, Perplexity)
                so your brand is the one summarized, cited, and linked. We do both.
              </p>
            </details>
            <details className="group rounded-xl border border-white/5 bg-[#111]/70 p-4">
              <summary className="flex cursor-pointer items-center justify-between text-white">
                <span>Can you manage my Google Business Profile?</span>
                <span className="text-white/30 group-open:rotate-180 transition">⌄</span>
              </summary>
              <p className="mt-3 text-sm text-white/60">
                Yes. We optimize categories, services, cities, posting cadence, and review requests.
              </p>
            </details>
            <details className="group rounded-xl border border-white/5 bg-[#111]/70 p-4">
              <summary className="flex cursor-pointer items-center justify-between text-white">
                <span>Do I have to be in Miami?</span>
                <span className="text-white/30 group-open:rotate-180 transition">⌄</span>
              </summary>
              <p className="mt-3 text-sm text-white/60">
                No, but we prioritize South Florida signals (Miami, Doral, Fort Lauderdale, Fort Myers).
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Uploader CTA - Development Only */}
      {process.env.NODE_ENV === "development" ? (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
            <div>
              <h3 className="text-2xl font-bold">Need to upload assets?</h3>
              <p className="text-white/75">Use the uploader to push images directly to ImageKit.</p>
            </div>
            <a href="/uploader" className="rounded-full px-6 py-3 font-bold text-black bg-white hover:opacity-90 transition">
              Open Uploader
            </a>
          </div>
        </section>
      ) : null}
    </main>
  );
}
