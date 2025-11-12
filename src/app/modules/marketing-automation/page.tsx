import { Metadata } from "next";
import Link from "next/link";
import IKImage from "@/components/IKImage";

export const metadata: Metadata = {
  title: "Marketing Automation Module | Audio Jones",
  description: "Advanced marketing automation powered by EPM Theory, AI-driven campaigns, and comprehensive funnel management for Audio Jones clients.",
  keywords: ["marketing automation", "EPM", "AI campaigns", "funnel management", "client delivery"],
};

export default function MarketingAutomationPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Module Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FF4500]/20 border border-[#FF4500]/30 mb-8">
              <div className="w-2 h-2 bg-[#FF4500] rounded-full animate-pulse mr-3"></div>
              <span className="text-sm font-medium text-[#FF4500]">Brand Module</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#FF4500] to-[#FFD700] bg-clip-text text-transparent">
                Marketing Automation
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-4">
              AI-Powered Campaign Management & EPM Integration
            </p>

            {/* Description */}
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                Our Marketing Automation Module combines EPM Theory with advanced AI to create, 
                manage, and optimize marketing campaigns that drive emotional engagement and measurable results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Automation Features
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* EPM-Driven Campaigns */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#FF4500]/10 to-transparent border border-[#FF4500]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4500] to-[#FFD700] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">EPM-Driven Campaigns</h3>
                <p className="text-white/70 mb-6">
                  Leverage Emotional Predictive Marketing to create campaigns that resonate 
                  deeply with your audience's psychological triggers and behavioral patterns.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FF4500] rounded-full mr-3"></div>
                    Neurological trigger analysis
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FF4500] rounded-full mr-3"></div>
                    Emotional response prediction
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FF4500] rounded-full mr-3"></div>
                    Behavioral pattern mapping
                  </li>
                </ul>
              </div>

              {/* AI Content Generation */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#008080]/10 to-transparent border border-[#008080]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#008080] to-[#FFD700] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">AI Content Generation</h3>
                <p className="text-white/70 mb-6">
                  Generate compelling copy, visuals, and multimedia content that aligns 
                  with your brand voice and drives conversions.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#008080] rounded-full mr-3"></div>
                    Dynamic copy optimization
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#008080] rounded-full mr-3"></div>
                    Visual asset creation
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#008080] rounded-full mr-3"></div>
                    Multi-channel adaptation
                  </li>
                </ul>
              </div>

              {/* Funnel Orchestration */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#FFD700]/10 to-transparent border border-[#FFD700]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FFD700] to-[#FF4500] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Funnel Orchestration</h3>
                <p className="text-white/70 mb-6">
                  Design and manage complex multi-stage funnels with automated triggers, 
                  personalization, and conversion optimization.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                    Multi-stage funnel design
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                    Automated trigger sequences
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                    Real-time optimization
                  </li>
                </ul>
              </div>

              {/* Integration Hub */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-r from-white to-[#008080] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🔗</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Integration Hub</h3>
                <p className="text-white/70 mb-6">
                  Seamlessly connect with your existing tools and platforms for 
                  unified marketing operations and data flow.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    MailerLite & email platforms
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    Whop & payment processors
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    N8N workflow automation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Examples */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Automation Workflows
            </h2>
            
            <div className="space-y-12">
              {/* Artist Onboarding Flow */}
              <div className="bg-gradient-to-r from-[#FF4500]/5 to-[#FFD700]/5 rounded-2xl p-8 border border-[#FF4500]/20">
                <h3 className="text-2xl font-bold mb-4 text-[#FF4500]">Artist Onboarding Flow</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-[#FF4500] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h4 className="font-semibold mb-2">Discovery</h4>
                    <p className="text-sm text-white/70">Initial consultation & brand assessment</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-black font-bold">2</span>
                    </div>
                    <h4 className="font-semibold mb-2">Strategy</h4>
                    <p className="text-sm text-white/70">EPM analysis & campaign planning</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-[#008080] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h4 className="font-semibold mb-2">Setup</h4>
                    <p className="text-sm text-white/70">Tool integration & automation config</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-black font-bold">4</span>
                    </div>
                    <h4 className="font-semibold mb-2">Launch</h4>
                    <p className="text-sm text-white/70">Campaign activation & monitoring</p>
                  </div>
                </div>
              </div>

              {/* Business Growth Flow */}
              <div className="bg-gradient-to-r from-[#008080]/5 to-[#FFD700]/5 rounded-2xl p-8 border border-[#008080]/20">
                <h3 className="text-2xl font-bold mb-4 text-[#008080]">Business Growth Flow</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-[#008080] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h4 className="font-semibold mb-2">Data Collection</h4>
                    <p className="text-sm text-white/70">Customer behavior tracking & analysis</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h4 className="font-semibold mb-2">Optimization</h4>
                    <p className="text-sm text-white/70">AI-driven campaign improvements</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-[#FF4500] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📈</span>
                    </div>
                    <h4 className="font-semibold mb-2">Scale</h4>
                    <p className="text-sm text-white/70">Automated expansion & growth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Section */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Powered by Advanced Integrations
            </h2>
            <p className="text-lg text-white/70 mb-12">
              Our Marketing Automation Module seamlessly integrates with your existing stack
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📧</span>
                </div>
                <p className="text-sm font-medium">MailerLite</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🛒</span>
                </div>
                <p className="text-sm font-medium">Whop</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔄</span>
                </div>
                <p className="text-sm font-medium">N8N</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💳</span>
                </div>
                <p className="text-sm font-medium">Stripe</p>
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
              Ready to Automate Your Marketing?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Join clients who have transformed their marketing operations with AI-powered automation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/book"
                className="px-8 py-3 bg-gradient-to-r from-[#FF4500] to-[#FFD700] text-black font-bold rounded-lg hover:scale-105 transition-transform"
              >
                Book Strategy Call
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