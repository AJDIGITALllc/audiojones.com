import Image from "next/image";


const TESTIMONIALS = [
  {
    name: "Abebe Lewis",
    role: "Circle House / Miami",
    quote:
      "Audio set up the AI + marketing workflow so we can move faster with content, partnerships, and offers.",
  },
  {
    name: "Inner Circle Team",
    role: "Legacy brand modernization",
    quote:
      "The infrastructure lets us plug in new media, new shows, and new revenue streams.",
  },
  {
    name: "Local Business Client",
    role: "Miami / Ft. Lauderdale",
    quote: "We went from no system to an automated lead + booking pipeline.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-black text-white min-h-screen">

      {/* hero */}
      <div className="grid grid-cols-2 gap-8 p-12">
        {/* left column */}
        <div className="flex flex-col space-y-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            AI Marketing • Local SEO • Automations
          </p>

          <h1 className="text-6xl font-bold leading-tight">
            Build your AI-first
            <br />
            Audio Jones ecosystem
          </h1>

          <p className="text-lg text-white/70">
            AJ DIGITAL LLC helps creators, consultants, and local businesses
            deploy marketing, automations, and client delivery in weeks — not
            months. Connected to Whop, MailerLite, n8n, and your Google stack.
          </p>

          <div className="flex items-center space-x-4">
            <a
              href="/book"
              className="rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-6 py-3 text-sm font-semibold text-black"
            >
              Get the build plan
            </a>
            <a
              href="/services"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5"
            >
              View services
            </a>
          </div>

          {/* testimonials */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-[0_14px_40px_rgba(0,0,0,0.15)]"
              >
                <p className="text-sm">“{t.quote}”</p>
                <div className="pt-4 text-xs">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-white/50">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* right card (matches current UI shell) */}
        <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-orange-500/10 to-transparent p-8 shadow-[0_0_100px_rgba(255,69,0,0.2)]">
          <div className="absolute inset-0 rounded-3xl border border-white/10"></div>
          <div className="relative z-10 flex h-full flex-col justify-end">
            {/* TODO: replace with actual image from /public/assets/... */}
            <div className="text-4xl font-bold">Audio Jones</div>
            {/*
            <Image
              src="/assets/AUDIO JONES WEBSITE IMAGES/hero/audiojones-portrait.png"
              alt="Audio Jones"
              fill
              className="object-cover"
              priority
            />
            */}
          </div>
        </div>
      </div>
    </main>
  );
}