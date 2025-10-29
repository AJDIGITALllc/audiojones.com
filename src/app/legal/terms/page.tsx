import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Audio Jones',
  description: 'Terms of Service for Audio Jones.',
  alternates: {
    canonical: 'https://audiojones.com/legal/terms',
  },
  openGraph: {
    title: 'Terms of Service | Audio Jones',
    description: 'Terms of Service for Audio Jones.',
    url: 'https://audiojones.com/legal/terms',
    images: [
      {
        url: 'https://audiojones.com/images/legal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Terms of Service | Audio Jones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function TermsPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Terms of Service</h1>
      <p className="mt-3 text-base opacity-80">Terms of service content.</p>
    </div>
  );
}
