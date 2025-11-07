// Audio Jones Homepage - Main entry point with enhanced hero section
import HomeHero from "@/components/home/HomeHero";
import ProblemAgitationSection from "@/components/home/ProblemAgitationSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ServicesStrip from "@/components/home/ServicesStrip";
import WhyAudioJonesSection from "@/components/home/WhyAudioJonesSection";
import Testimonials from "@/components/home/Testimonials";
import ModulesShowcase from "@/components/home/ModulesShowcase";
import HomeFAQ from "@/components/home/HomeFAQ";
import LegalBand from "@/components/home/LegalBand";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Audio Jones — AI, Media & Marketing Systems | Miami-Based Creative Technology",
  description: "AJ DIGITAL LLC builds client-ready AI funnels, podcast systems, and marketing automation for creators, consultants, and studios. 500+ systems deployed, 25x average ROI.",
  keywords: "AI marketing automation, podcast systems, creator economy, Miami marketing agency, content automation, AI funnels, marketing systems",
  openGraph: {
    title: "Audio Jones — AI, Media & Marketing Systems",
    description: "AI-tuned funnels, podcast delivery, and marketing automation. 500+ systems deployed with 25x average ROI.",
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AJ DIGITAL LLC",
    "alternateName": "Audio Jones",
    "url": "https://audiojones.com",
    "logo": "https://audiojones.com/assets/audio-jones-logo.webp",
    "description": "Miami-based AI, media & marketing systems company specializing in automation for creators, consultants, and studios.",
    "foundingDate": "2020",
    "founders": [
      {
        "@type": "Person",
        "name": "Audio Jones Team"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Miami",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "areaServed": "Worldwide",
    "knowsAbout": [
      "AI Marketing Automation",
      "Podcast Production Systems",
      "Creator Economy Solutions",
      "Content Management Systems",
      "Marketing Funnels"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI & Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Marketing Automation",
            "description": "Custom AI systems for marketing automation and lead generation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Podcast Production Systems",
            "description": "End-to-end podcast production and distribution automation"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50+",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <main>
        <HomeHero />
        <ProblemAgitationSection />
        <HowItWorksSection />
        <ServicesStrip />
        <WhyAudioJonesSection />
        <Testimonials />
        <ModulesShowcase />
        <HomeFAQ />
        <LegalBand />
      </main>
    </>
  );
}
