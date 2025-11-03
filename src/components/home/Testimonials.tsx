"use client";

import { testimonials } from "@/data/testimonials";
import { CTA_LINKS } from "@/config/marketing";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-[#0B0B0B] py-16 sm:py-20 lg:py-24 text-white">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#FF4500]">Client Results</p>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Trusted by South Florida Leaders &amp; Creators
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg leading-8 text-gray-300">
            Discover the impact of a streamlined system from leaders who transformed their brand presence.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="relative rounded-xl bg-white/5 p-8 shadow-lg ring-1 ring-white/10"
            >
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#FF4500] to-transparent" aria-hidden />
              <div className="flex items-center gap-6">
                <div
                  className="h-16 w-16 flex-shrink-0 rounded-full bg-center bg-cover p-1 ring-2 ring-offset-2 ring-offset-[#0B0B0B] ring-[#FFD700]"
                  style={{ backgroundImage: `url(${testimonial.image})` }}
                  aria-hidden
                />
                <div>
                  <p className="text-base font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <blockquote className="mt-6 text-base leading-7 text-gray-300">
                “{testimonial.quote}”
              </blockquote>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={CTA_LINKS.bookStrategy}
            className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-8 text-base font-bold tracking-wide text-black shadow-[0_0_20px_0_rgba(255,69,0,0.45)] transition hover:scale-105"
          >
            Start Your Studio System
          </a>
        </div>
      </div>
    </section>
  );
}
