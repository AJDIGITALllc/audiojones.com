// Audio Jones Homepage - Production-ready hero section with brand alignment
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Audio Jones — AI, Media & Marketing Systems",
  description: "AJ DIGITAL LLC builds client-ready AI funnels, podcast systems, and marketing automation for creators, consultants, and studios.",
  openGraph: {
    title: "Audio Jones — AI, Media & Marketing Systems",
    description: "AI-tuned funnels, podcast delivery, and marketing automation.",
    type: "website"
  }
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-black to-[#FF4500] relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative z-10 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8" data-animate="fade-up">
              
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                AI, Media & Marketing{" "}
                <span className="text-transparent bg-gradient-to-r from-[#FF4500] to-[#FFD700] bg-clip-text">
                  Systems for Creators
                </span>
                .
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
                Built under AJ DIGITAL LLC, deployed across your funnels, podcasts, and automation stack.
              </p>

              {/* Trust Badge */}
              <div className="py-4" data-animate="fade-up" data-delay="200">
                <p className="text-sm text-gray-400 mb-3">
                  Trusted by Audio Jones clients & partners
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Creator Economy Leaders", "Podcast Networks", "Service Businesses", "SaaS Platforms"].map((partner, index) => (
                    <span
                      key={index}
                      className="text-xs text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4" data-animate="fade-up" data-delay="400">
                {/* Primary CTA */}
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-[#FF4500] hover:bg-[#e63e00] text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  <span>Book a Build Session</span>
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                {/* Secondary CTA */}
                <a
                  href="#services"
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 font-semibold rounded-lg transition-all duration-200"
                >
                  <span>View Services</span>
                  <svg className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Media */}
            <div className="flex justify-center lg:justify-end" data-animate="fade-up" data-delay="300">
              <div className="relative">
                
                {/* Hero Image Container */}
                <div className="relative mx-auto aspect-square w-full max-w-[560px] rounded-3xl bg-gradient-to-br from-[#FF4500]/10 to-[#FFD700]/10 p-4 ring-1 ring-white/10 backdrop-blur-sm">
                  
                  {/* Hero Image */}
                  <div className="relative h-full w-full rounded-2xl overflow-hidden">
                    <Image
                      src="/assets/Backgrounds/aj-hero-portrait.webp"
                      alt="Audio Jones - AI Marketing Systems"
                      fill
                      className="object-cover object-center"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Stats Overlay - Shows on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF4500]/90 to-[#FFD700]/90 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                      <div className="h-full flex items-center justify-center p-8">
                        <div className="grid grid-cols-2 gap-6 text-center">
                          {[
                            { label: "Revenue Increase", value: "340%", icon: "📈" },
                            { label: "Automation ROI", value: "25x", icon: "🤖" },
                            { label: "Podcast Downloads", value: "2M+", icon: "🎙️" },
                            { label: "Systems Built", value: "500+", icon: "⚡" }
                          ].map((stat, index) => (
                            <div key={index} className="text-white">
                              <div className="text-2xl mb-2">{stat.icon}</div>
                              <div className="text-3xl font-bold mb-1">{stat.value}</div>
                              <div className="text-sm opacity-90">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#008080]/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-2xl animate-pulse delay-1000" />
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,69,0,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section id="services" className="relative py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Systems That <span className="text-[#FF4500]">Actually Work</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From Miami to worldwide: we build the automation infrastructure that scales your creative work into predictable revenue.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Marketing Funnels",
                description: "Automated lead generation and conversion systems",
                icon: "🤖"
              },
              {
                title: "Podcast Production",
                description: "End-to-end podcast systems and distribution",
                icon: "🎙️"
              },
              {
                title: "Creator Automation",
                description: "Content workflows and monetization systems",
                icon: "⚡"
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-[#FF4500]/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}