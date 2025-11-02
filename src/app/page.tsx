// Audio Jones Homepage - Main entry point with enhanced hero section
import HomeHero from "@/components/home/HomeHero";
import ProblemAgitationSection from "@/components/home/ProblemAgitationSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ServicesStrip from "@/components/home/ServicesStrip";
import WhyAudioJonesSection from "@/components/home/WhyAudioJonesSection";
import Testimonials from "@/components/home/Testimonials";
import ModulesShowcase from "@/components/home/ModulesShowcase";
import LegalBand from "@/components/home/LegalBand";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Audio Jones — AI, Media & Marketing Systems",
  description: "AJ DIGITAL LLC builds client-ready AI funnels, podcast systems, and marketing automation for creators, consultants, and studios.",
  openGraph: {
    title: "Audio Jones — AI, Media & Marketing Systems",
    description: "AI-tuned funnels, podcast delivery, and marketing automation.",
    type: "website",
    url: "https://audiojones.com",
    siteName: "Audio Jones",
    images: [
      {
        url: "/assets/audio-jones-hero.webp",
        width: 1200,
        height: 630,
        alt: "Audio Jones - AI, Media & Marketing Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Jones — AI, Media & Marketing Systems",
    description: "AI-tuned funnels, podcast delivery, and marketing automation.",
    images: ["/assets/audio-jones-hero.webp"],
  },
};

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <ProblemAgitationSection />
      <HowItWorksSection />
      <ServicesStrip />
      <WhyAudioJonesSection />
      <Testimonials />
      <ModulesShowcase />
      <LegalBand />
    </main>
  );
}
