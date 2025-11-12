import { Metadata } from "next";
import IKImage from "@/components/IKImage";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ArtistHub - Tools for Artists, Producers & Creators | Audio Jones",
  description: "Monetize your music, streamline your brand, and manage your releases through ArtistHub — a personalized creative dashboard by Audio Jones.",
  keywords: ["artist tools", "music marketing", "brand management", "music monetization", "creative dashboard", "artist services"],
  openGraph: {
    title: "ArtistHub - Tools for Artists, Producers & Creators",
    description: "Professional tools and services designed specifically for artists, producers, and music creators.",
    images: [
      {
        url: "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/ARTISTHUB/artisthub-hero.jpg",
        width: 1200,
        height: 630,
        alt: "ArtistHub by Audio Jones"
      }
    ]
  }
};

export default function ArtistHubPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FF4500]/20 border border-[#FF4500]/30 mb-8">
              <div className="w-2 h-2 bg-[#FF4500] rounded-full animate-pulse mr-3"></div>
              <span className="text-sm font-medium text-[#FF4500]">For Artists & Creators</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#FF4500] to-[#FFD700] bg-clip-text text-transparent">
                ArtistHub
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-4">
              Tools for Artists, Producers, and Creators
            </p>

            {/* Description */}
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                Monetize your music, streamline your brand, and manage your releases through 
                ArtistHub — a personalized creative dashboard by Audio Jones.
              </p>
              
              <p className="text-base md:text-lg text-white/60 leading-relaxed">
                From marketing automation to brand development, ArtistHub provides everything 
                you need to build a sustainable music career in the digital age.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Tiers */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Choose Your Artist Journey
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Starter Tier */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20 relative">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Starter</h3>
                  <p className="text-white/70 mb-4">Consultation + Setup</p>
                  <div className="text-4xl font-bold mb-2">$497</div>
                  <p className="text-sm text-white/60">One-time setup fee</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#FF4500] rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Brand Strategy Session (2 hours)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#FF4500] rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Social Media Template Pack</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#FF4500] rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Release Planning Guide</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#FF4500] rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Basic Email Automation Setup</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#FF4500] rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>30 Days Portal Access</span>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-gradient-to-r from-[#FF4500] to-[#FFD700] text-black font-bold rounded-lg hover:scale-105 transition-transform">
                  Get Started
                </button>
              </div>

              {/* Growth Tier */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#FFD700]/20 to-[#FF4500]/10 border-2 border-[#FFD700] relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#FFD700] text-black px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Growth</h3>
                  <p className="text-white/70 mb-4">Full Marketing Automation</p>
                  <div className="text-4xl font-bold mb-2">$1,497</div>
                  <p className="text-sm text-white/60">One-time + $297/month</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#FFD700] rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span className="font-medium">Everything in Starter, plus:</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#FFD700] rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Complete Marketing Automation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#FFD700] rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Monthly Strategy Calls</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#FFD700] rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Advanced Analytics Dashboard</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#FFD700] rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Content Calendar & Planning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-[#FFD700] rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Unlimited Portal Access</span>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FF4500] text-black font-bold rounded-lg hover:scale-105 transition-transform">
                  Choose Growth
                </button>
              </div>

              {/* VIP Tier */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20 relative">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">VIP</h3>
                  <p className="text-white/70 mb-4">Done-for-You Everything</p>
                  <div className="text-4xl font-bold mb-2">$4,997</div>
                  <p className="text-sm text-white/60">One-time + $997/month</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span className="font-medium">Everything in Growth, plus:</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Complete Brand Development</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Done-for-You Release Campaigns</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Weekly 1:1 Coaching Calls</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Priority Support & Direct Access</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs text-black">✓</span>
                    </div>
                    <span>Custom EPM Strategy Implementation</span>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-white text-black font-bold rounded-lg hover:scale-105 transition-transform">
                  Go VIP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              ArtistHub Features
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4500] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎵</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Release Management</h3>
                <p className="text-white/70">
                  Plan, schedule, and execute your music releases with precision timing and maximum impact.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4500] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Social Media Automation</h3>
                <p className="text-white/70">
                  Automated posting, content templates, and engagement strategies across all platforms.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4500] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Monetization Tools</h3>
                <p className="text-white/70">
                  Multiple revenue streams, fan funding, merchandise integration, and income tracking.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4500] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Analytics & Insights</h3>
                <p className="text-white/70">
                  Deep analytics on your audience, engagement metrics, and performance tracking.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4500] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Brand Development</h3>
                <p className="text-white/70">
                  Visual identity, brand messaging, and cohesive aesthetic across all touchpoints.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4500] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Industry Connections</h3>
                <p className="text-white/70">
                  Access to our network of industry professionals, collaborators, and opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Elevate Your Music Career?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Join hundreds of artists who have transformed their careers with ArtistHub. 
              Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/book"
                className="px-8 py-3 bg-gradient-to-r from-[#FF4500] to-[#FFD700] text-black font-bold rounded-lg hover:scale-105 transition-transform"
              >
                Book Discovery Call
              </Link>
              <Link 
                href="/portal"
                className="px-8 py-3 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition"
              >
                Access Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}