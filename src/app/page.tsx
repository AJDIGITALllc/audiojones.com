import HomeHero from "@/components/home/HomeHero";
import ServicesStrip from "@/components/home/ServicesStrip";
import Testimonials from "@/components/home/Testimonials";
import ModulesShowcase from "@/components/home/ModulesShowcase";
import LegalBand from "@/components/home/LegalBand";

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <ServicesStrip />
      <Testimonials />
      <ModulesShowcase />
      <LegalBand />
    </main>
  );
}
