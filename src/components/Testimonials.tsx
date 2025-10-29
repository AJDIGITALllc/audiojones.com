import React from 'react';

const IMG = process.env.NEXT_PUBLIC_IMGKIT_BASE || '';

type T = { name: string; title: string; img: string; quote: string };

const ITEMS: T[] = [
  {
    name: 'Abebe Lewis',
    title: 'Music Executive',
    img: `${IMG}/clients/abebe-lewis.webp`,
    quote:
      'Audio built a clean podcast pipeline and marketing system that amplified our brand without slowing the team.'
  },
  {
    name: 'K. Foxx',
    title: 'On-Air Personality, 99 JAMZ',
    img: `${IMG}/clients/kfoxx.webp`,
    quote:
      'From strategy to clips to distribution, the workflow just works. My content hits faster and lands stronger.'
  },
  {
    name: 'Michael Keegan',
    title: 'CEO, Florida Ramp & Lift',
    img: `${IMG}/clients/michael-keegan.webp`,
    quote:
      'We turned one interview into weeks of content and qualified leads. Real ROI from day one.'
  }
];

export default function Testimonials() {
  return (
    <section className="bg-[#111111] py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-white sm:text-4xl">
          Trusted by South Florida Leaders &amp; Creators
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {ITEMS.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-4">
                <span className="inline-flex items-center justify-center rounded-full p-[2px] bg-gradient-to-br from-[#FF4500] to-[#FFD700]">
                  <img
                    src={t.img}
                    alt={`${t.name} headshot`}
                    width={112}
                    height={112}
                    className="h-14 w-14 rounded-full object-cover bg-[#111111]"
                    loading="lazy"
                  />
                </span>
                <figcaption className="text-sm text-white">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-white/70">{t.title}</div>
                </figcaption>
              </div>
              <blockquote className="text-white/85">“{t.quote}”</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}