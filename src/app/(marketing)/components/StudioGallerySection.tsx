"use client";

import Image from "next/image";

const GALLERY = [
  {
    src: "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/gallery/podcast-suite.webp",
    alt: "Main Podcast Suite — Pro audio setup and lighting",
    caption: "Main Podcast Suite",
  },
  {
    src: "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/gallery/control-room.webp",
    alt: "Control Room — Live monitoring and editing",
    caption: "Control Room",
  },
  {
    src: "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/gallery/lounge.webp",
    alt: "Content Lounge — Multi-angle video and social capture",
    caption: "Content Lounge",
  },
  {
    src: "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/gallery/vocal-booth.webp",
    alt: "Vocal Booth — Clean sound and acoustics",
    caption: "Vocal Booth",
  },
  {
    src: "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/gallery/creative-lab.webp",
    alt: "Creative Lab — AI workflow + post-production zone",
    caption: "Creative Lab",
  },
  {
    src: "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/gallery/exterior.webp",
    alt: "Exterior — Circle House Studios, Miami FL",
    caption: "Exterior — Circle House",
  },
];

export default function StudioGallerySection() {
  return (
    <section className="bg-[#0A0A0A] border-t border-white/5 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-[#FF4500]">
          INSIDE CIRCLE HOUSE
        </p>
        <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
          Step into the Studio.
        </h2>
        <p className="mt-4 text-base text-white/60 sm:text-lg max-w-2xl mx-auto">
          From podcast control rooms to creative lounges, our space is built for collaboration, storytelling, and content creation.
        </p>
      </div>

      <div className="mx-auto mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl px-4">
        {GALLERY.map((item) => (
          <figure
            key={item.caption}
            className="group relative overflow-hidden rounded-2xl border border-white/10 transition hover:border-[#FFD700]/50 hover:scale-[1.02]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={600}
              height={400}
              className="h-64 w-full object-cover transition duration-500 group-hover:brightness-110"
              loading="lazy"
            />
            <figcaption className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-sm font-medium text-white/90 text-left">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="/book?source=gallery"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-10 py-4 text-sm font-semibold text-black hover:brightness-110 transition"
        >
          Book a Studio Tour
        </a>
      </div>
    </section>
  );
}