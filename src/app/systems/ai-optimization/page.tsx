import { Metadata } from "next";
import Link from "next/link";
import { getModuleById } from "@/config/modules";

const module = getModuleById("ai-optimization")!;

export const metadata: Metadata = {
  title: "AI Optimization System | Audio Jones",
  description: "Real-time AI optimization with A/B testing, machine learning, and intelligent performance improvements.",
  keywords: ["ai optimization", "machine learning", "a/b testing", "performance optimization", "automated improvement"],
};

export default function AIOptimizationSystemPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Module Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#9370DB]/20 border border-[#9370DB]/30 mb-8">
              <div className="w-2 h-2 bg-[#9370DB] rounded-full animate-pulse mr-3"></div>
              <span className="text-sm font-medium text-[#9370DB]">System Module</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className={`bg-gradient-to-r from-[${module.gradient.from}] to-[${module.gradient.to}] bg-clip-text text-transparent`}>
                {module.name}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              {module.tagline}
            </p>

            {/* Description */}
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-white/70 leading-relaxed">
                {module.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How This Connects Section */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How This Connects
            </h2>

            <div className="space-y-8">
              {/* Client Portal Integration */}
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">👤</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Client Portal Integration</h3>
                    <p className="text-white/70 mb-4">
                      Clients monitor optimization results at <strong>client.audiojones.com</strong> to:
                    </p>
                    <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                      <li>View real-time performance improvements and wins</li>
                      <li>Access A/B test results and recommendations</li>
                      <li>Review predictive analytics and forecasts</li>
                      <li>Track ROI improvements over time</li>
                      <li>Set optimization goals and priorities</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Admin Portal Integration */}
              <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">⚙️</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Admin Portal Integration</h3>
                    <p className="text-white/70 mb-4">
                      Team members use <strong>admin.audiojones.com</strong> to:
                    </p>
                    <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                      <li>Configure AI optimization rules and thresholds</li>
                      <li>Manage experiment pipelines and testing protocols</li>
                      <li>Monitor model performance across all clients</li>
                      <li>Deploy new ML models and algorithms</li>
                      <li>Configure auto-scaling and resource optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Billing Integration */}
              <div className="p-6 rounded-xl border border-[#FFD700]/20 bg-[#FFD700]/5">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">💳</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Billing Integration</h3>
                    <p className="text-white/70 mb-4">
                      Seamlessly integrated with Whop and Stripe for:
                    </p>
                    <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                      <li>Monthly AI optimization subscriptions</li>
                      <li>Performance-based pricing tiers</li>
                      <li>Advanced ML model access upgrades</li>
                      <li>Custom optimization packages</li>
                    </ul>
                    {/* TODO: Add specific Whop/Stripe checkout URLs for optimization packages */}
                    <p className="mt-4 text-sm text-white/50">
                      <em>Checkout integration: Links to be added for AI optimization packages</em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Section */}
      <div className="py-20 border-t border-white/10 bg-gradient-to-b from-transparent to-white/5">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Optimization Pipeline
            </h2>

            <div className="grid md:grid-cols-5 gap-4">
              {/* Step 1: Baseline */}
              <div className="relative">
                <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 z-10">
                  <svg className="w-4 h-4 text-[#9370DB]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </div>
                <div className="p-6 rounded-xl border border-[#9370DB]/30 bg-[#9370DB]/10 text-center h-full">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="text-lg font-bold mb-2 text-[#9370DB]">1. Baseline</h3>
                  <p className="text-sm text-white/70">
                    Establish performance metrics
                  </p>
                </div>
              </div>

              {/* Step 2: Analyze */}
              <div className="relative">
                <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 z-10">
                  <svg className="w-4 h-4 text-[#9370DB]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </div>
                <div className="p-6 rounded-xl border border-[#9370DB]/30 bg-[#9370DB]/10 text-center h-full">
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className="text-lg font-bold mb-2 text-[#9370DB]">2. Analyze</h3>
                  <p className="text-sm text-white/70">
                    AI identifies opportunities
                  </p>
                </div>
              </div>

              {/* Step 3: Test */}
              <div className="relative">
                <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 z-10">
                  <svg className="w-4 h-4 text-[#9370DB]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </div>
                <div className="p-6 rounded-xl border border-[#9370DB]/30 bg-[#9370DB]/10 text-center h-full">
                  <div className="text-4xl mb-3">🧪</div>
                  <h3 className="text-lg font-bold mb-2 text-[#9370DB]">3. Test</h3>
                  <p className="text-sm text-white/70">
                    Run A/B experiments
                  </p>
                </div>
              </div>

              {/* Step 4: Implement */}
              <div className="relative">
                <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 z-10">
                  <svg className="w-4 h-4 text-[#9370DB]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </div>
                <div className="p-6 rounded-xl border border-[#9370DB]/30 bg-[#9370DB]/10 text-center h-full">
                  <div className="text-4xl mb-3">⚡</div>
                  <h3 className="text-lg font-bold mb-2 text-[#9370DB]">4. Implement</h3>
                  <p className="text-sm text-white/70">
                    Deploy winning variants
                  </p>
                </div>
              </div>

              {/* Step 5: Monitor */}
              <div className="p-6 rounded-xl border border-[#9370DB]/30 bg-[#9370DB]/10 text-center h-full">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="text-lg font-bold mb-2 text-[#9370DB]">5. Monitor</h3>
                <p className="text-sm text-white/70">
                  Continuous improvement loop
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Unlock Continuous Improvement
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Book a session to see how AI optimization can maximize your performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://client.audiojones.com/login"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#9370DB] to-[#FFD700] text-white font-bold text-lg hover:opacity-90 transition"
              >
                Book a Session
              </Link>
              <Link
                href="/systems/ai-optimization#portal-overview"
                className="px-8 py-4 rounded-full border-2 border-white/20 text-white font-bold text-lg hover:border-white/40 transition"
              >
                See Client Portal
                {/* TODO: Create dedicated portal overview section or separate page */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
