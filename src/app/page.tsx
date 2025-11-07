// Audio Jones Homepage - Modular sections based on canonical schema
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import RealBlockersSection from '@/components/home/RealBlockersSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import InsightsSection from '@/components/home/InsightsSection';
import CaseStudySection from '@/components/home/CaseStudySection';
import PackagesSection from '@/components/home/PackagesSection';
import FAQSection from '@/components/home/FAQSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import WhyAudioJonesSection from '@/components/home/WhyAudioJonesSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <RealBlockersSection />
      <TestimonialsSection />
      <InsightsSection />
      <CaseStudySection />
      <PackagesSection />
      <FAQSection />
      <NewsletterSection />
      <WhyAudioJonesSection />
    </>
  );
}
