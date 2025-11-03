import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import ServicesStrip from "@/components/home/ServicesStrip";
import ProblemAgitationSection from "@/components/home/ProblemAgitationSection";
import Testimonials from "@/components/home/Testimonials";
import InsightsShowcase from "@/components/home/InsightsShowcase";
import FAQSection from "@/components/home/FAQSection";
import ModulesShowcase from "@/components/home/ModulesShowcase";
import LegalBand from "@/components/home/LegalBand";

export const metadata: Metadata = {
  title: "Audio Jones — AI, Media & Marketing Systems",
  description:
    "AJ DIGITAL LLC builds client-ready AI funnels, podcast systems, and marketing automation for creators, consultants, and studios.",
  openGraph: {
    title: "Audio Jones — AI, Media & Marketing Systems",
    description: "AI-tuned funnels, podcast delivery, and marketing automation.",
    type: "website",
    url: "https://audiojones.com",
    siteName: "Audio Jones",
    images: [
      {
        url: "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIO%20JONES%20HERO%20IMAGE%20%20(1).webp?updatedAt=1762104789649",
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
    images: [
      "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIO%20JONES%20HERO%20IMAGE%20%20(1).webp?updatedAt=1762104789649",
    ],
  },
};

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <ServicesStrip />
      <ProblemAgitationSection />
      <Testimonials />
      <InsightsShowcase />
      <FAQSection />
      <ModulesShowcase />
      <LegalBand />
    </main>
  );
}
