import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Audio Jones | AI Marketing & Automation',
  description: 'Learn about the founder, process, and values of Audio Jones.',
  alternates: {
    canonical: 'https://audiojones.com/about',
  },
  openGraph: {
    title: 'About Audio Jones',
    description: 'Learn about the founder, process, and values of Audio Jones.',
    url: 'https://audiojones.com/about',
    images: [
      {
        url: 'https://audiojones.com/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: 'About Audio Jones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#111] text-white">
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">About Audio Jones</h1>
        <p className="mt-3 text-base opacity-80">Founder story, process, values, and optimized headshot.</p>
      </section>
    </main>
  );
}
