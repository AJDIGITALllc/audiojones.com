import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Audio Jones',
  description: 'Privacy Policy for Audio Jones.',
  alternates: {
    canonical: 'https://audiojones.com/legal/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Audio Jones',
    description: 'Privacy Policy for Audio Jones.',
    url: 'https://audiojones.com/legal/privacy',
    images: [
      {
        url: 'https://audiojones.com/images/legal-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy | Audio Jones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function PrivacyPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-base opacity-80">Privacy policy content.</p>
    </div>
  );
}
