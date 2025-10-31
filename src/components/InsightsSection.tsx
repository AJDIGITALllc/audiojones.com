import React from 'react';
import Link from 'next/link';

const insightsData = [
  {
    href: '/insights/ai-marketing-local-dominance',
    category: 'AI Marketing',
    title: 'AI Marketing: the guide for local dominance',
    readTime: '5 min read',
  },
  {
    href: '/insights/content-flywheel-personal-brand',
    category: 'Content Systems',
    title: 'Build a content flywheel for your personal brand',
    readTime: '7 min read',
  },
  {
    href: '/insights/miami-aeo-playbook',
    category: 'AEO / Local SEO',
    title: 'The Miami AEO playbook: win the local search game',
    readTime: '6 min read',
  },
];

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Audio Jones Insights",
  "itemListElement": [
    {
      "@type": "BlogPosting",
      "position": 1,
      "headline": "AI Marketing: the guide for local dominance",
      "url": "https://audiojones.com/insights/ai-marketing-local-dominance",
      "author": {
        "@type": "Person",
        "name": "Tyrone Alexander Nelms"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AJ DIGITAL LLC"
      }
    },
    {
      "@type": "BlogPosting",
      "position": 2,
      "headline": "Build a content flywheel for your personal brand",
      "url": "https://audiojones.com/insights/content-flywheel-personal-brand",
      "author": {
        "@type": "Person",
        "name": "Tyrone Alexander Nelms"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AJ DIGITAL LLC"
      }
    },
    {
      "@type": "BlogPosting",
      "position": 3,
      "headline": "The Miami AEO playbook: win the local search game",
      "url": "https://audiojones.com/insights/miami-aeo-playbook",
      "author": {
        "@type": "Person",
        "name": "Tyrone Alexander Nelms"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AJ DIGITAL LLC"
      }
    }
  ]
};

const InsightsSection = () => {
  return (
    <>
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div className="flex-1">
              <p className="text-[#FF4500] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-2">
                INSIGHTS &amp; PLAYBOOKS
              </p>
              <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                Learn how Miami leaders stay visible.
              </h2>
              <p className="text-white/70 text-base sm:text-lg max-w-2xl">
                AI, podcasting, and AEO strategies we’re using with clients right now.
              </p>
            </div>
            <div className="flex-shrink-0 mt-4 md:mt-0">
              <Link
                href="/insights"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/5 transition"
              >
                View all insights
              </Link>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insightsData.map((insight) => (
              <Link
                key={insight.href}
                href={insight.href}
                className="flex flex-col rounded-2xl border border-white/5 bg-white/5 p-6 transition hover:border-[#FFD700]/50 hover:-translate-y-1 group"
              >
                <p className="text-[#FFD700] text-xs font-semibold tracking-wide uppercase mb-3">
                  {insight.category}
                </p>
                <h3 className="text-white text-lg sm:text-xl font-bold leading-tight mb-3">
                  {insight.title}
                </h3>
                <p className="text-white/35 text-sm">{insight.readTime}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[#FFD700] text-sm font-semibold">
                  Read article
                  <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
    </>
  );
};

export default InsightsSection;