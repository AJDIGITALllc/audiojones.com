import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Audio Jones',
  description: 'Articles and insights from Audio Jones.',
  alternates: {
    canonical: 'https://audiojones.com/blog',
  },
  openGraph: {
    title: 'Blog | Audio Jones',
    description: 'Articles and insights from Audio Jones.',
    url: 'https://audiojones.com/blog',
    images: [
      {
        url: 'https://audiojones.com/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog | Audio Jones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#111] text-white">
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Blog</h1>
        <p className="mt-3 text-base opacity-80">Index with Blog/Article schema; related posts component.</p>
      </section>
    </main>
  );
}
