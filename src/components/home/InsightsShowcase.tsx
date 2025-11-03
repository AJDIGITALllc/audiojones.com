export default function InsightsShowcase() {
  const cards = [
    {
      title: "The Miami Podcast Playbook: How to Launch a Show That Gets Noticed",
      category: "AI Marketing • 5 min read",
      description:
        "A step-by-step approach to launching a video-first show for South Florida audiences.",
      href: "/blog/miami-podcast-playbook",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuALIuT_z9iONkvaxl2V2a5KpJ3-hB00lKUrjiJNGylwbdCZFEufo4-IRxnUBRJbBfZtT3Gwn4XLWWMULTVafNtoF8CT9dR76obURMYMlamWF8PJNiJi5eDEvSuMVYRd7ElWhFP5EdqW4b-KVHAZ0UoI57f_s9SLZIPv2UYfHqUfGmcXf0aiMAJfs26te6daMCP4nwitysMZHHPVJE1TdlstG0RoBwQf6qJCFWbqOvrpMdvJZdLd29N9PK_lV-1PlhZJcFRDkJaiT-A",
    },
    {
      title: "AI-Powered Content Marketing: How to Generate Leads on Autopilot",
      category: "Content Systems • 7 min read",
      description: "Use automation and AI to turn episodes into multi-channel lead gen.",
      href: "/blog/ai-powered-content-marketing",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDzA6uOZnyxeK0KsbKj9feBBZWpIJZRKVtpHbieFPu5Uoyrvv7FVI4UpxLNGha9XtMaBza5u6kQ2OvC_YmVj4rQmeT1cPH93tqGQvRg9rwdhRVs5zTJfHQ5n3VML-6It-cG20-SJyNMMWsZZ9-i75qHPUKUK9gf5kA96Rbpol71BS58KYQ3CulO1hzKfxSWCSBJs9j-w16I17z2h3mreCTROdcoAHGPwcnlqfbphtEf5_HxjQN8uzxVR1sTpsS4M86DYifPmvh56nM",
    },
    {
      title: "The AEO Framework: How to Build a Personal Brand That Attracts Clients",
      category: "AEO / Local SEO • 6 min read",
      description: "Position yourself for Miami search, zero-click results, and branded queries.",
      href: "/blog/miami-aeo-framework",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_oXrpO1n6EMg7g6c3qsNyGv8sV7SV8b-r7F1-qCR9kCVkk7Kk6ctjd3YTU2l0UghGSiS2RUYe3VBJuFcLUSLbCUezTtoj0xF-OouiXDlw5rhU_17PvW4235j7nMiE7jt8Gczv9JF4Ode2Ki0Pi0wyCpZA9DhEX0cV6sB3FEaENtzKHvG-QTs36S--yKEWM3u19xhMbS_3HGygHwwkuqxRhZhDd3QrbjRltyWJZWY4NDuvFSuRcIPnc0uGar4b8gURHIbRkS72FNo",
    },
  ];

  return (
    <section
      className="relative py-20 text-white"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/Backgrounds/Audio_Jones_Website_Backgrounds_%20(5).png?updatedAt=1761600049689')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">Insights &amp; Playbooks</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold leading-tight">Learn how Miami leaders stay visible.</h2>
            <p className="mt-2 max-w-2xl text-gray-200">AI, podcasting, and AEO strategies we’re using with clients right now.</p>
          </div>
          <a
            href="/insights"
            className="inline-flex items-center rounded-full border border-white/30 bg-black/40 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/80"
          >
            View all insights
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.href}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/50 backdrop-blur"
            >
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.image})` }}
                aria-hidden
              />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="text-xs uppercase tracking-wide text-orange-300">{card.category}</p>
                <h3 className="text-lg font-semibold leading-snug">{card.title}</h3>
                <p className="flex-1 text-sm text-gray-300">{card.description}</p>
                <a
                  href={card.href}
                  className="inline-flex items-center self-start rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-4 py-2 text-sm font-semibold text-black shadow-md transition hover:opacity-90"
                >
                  Open Playbook →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
