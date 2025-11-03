import { Metadata } from 'next';
import ArtistHubLayout from '@/components/pages/ArtistHub/ArtistHubLayout';

export const metadata: Metadata = {
  title: 'Artist Hub | Audio Jones',
  description: 'Professional studio services for artists, producers, and creatives. Book studio time, mixing/mastering, beats, and consultations.',
  openGraph: {
    title: 'Artist Hub | Audio Jones',
    description: 'Professional studio services for artists, producers, and creatives',
    type: 'website',
    url: 'https://audiojones.com/artist-hub',
    siteName: 'Audio Jones',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artist Hub | Audio Jones',
    description: 'Professional studio services for artists, producers, and creatives',
  },
  keywords: ['studio booking', 'mixing mastering', 'beats', 'artist consultation', 'audio production'],
  robots: {
    index: true,
    follow: true,
  }
};

export default function ArtistHubPage() {
  return <ArtistHubLayout />;
}