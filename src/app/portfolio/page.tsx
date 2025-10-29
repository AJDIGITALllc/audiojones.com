import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Audio Jones',
  description: 'Case studies and results from Audio Jones.',
  alternates: {
    canonical: 'https://audiojones.com/portfolio',
  },
  openGraph: {
    title: 'Portfolio | Audio Jones',
    description: 'Case studies and results from Audio Jones.',
    url: 'https://audiojones.com/portfolio',
    images: [
      {
        url: 'https://audiojones.com/images/portfolio-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio | Audio Jones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#111] text-white">
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Portfolio</h1>
        <p className="mt-3 text-base opacity-80">Problem→Solution→Results.</p>
      </section>
    </main>
  );
}
