import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Intelligence System | Audio Jones",
  description: "Comprehensive analytics, custom dashboards, and data-driven insights for strategic decision making.",
  keywords: ["data intelligence", "analytics", "dashboards", "data insights", "business intelligence"],
};

export default function DataIntelligenceSystemPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Module Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#4169E1]/20 border border-[#4169E1]/30 mb-8">
              <div className="w-2 h-2 bg-[#4169E1] rounded-full animate-pulse mr-3"></div>
              <span className="text-sm font-medium text-[#4169E1]">System Module</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#4169E1] to-[#00CED1] bg-clip-text text-transparent">
                Data Intelligence System
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Turn data into actionable insights and strategic decisions
            </p>

            {/* Description */}
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-white/70 leading-relaxed">
                Comprehensive analytics and custom dashboards transform raw data into clear insights.
                Track everything that matters, understand what&apos;s working, and make data-driven decisions with confidence.
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
                      Clients access their analytics at <strong>client.audiojones.com</strong> to:
                    </p>
                    <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                      <li>View custom dashboards tailored to their goals</li>
                      <li>Track performance metrics in real-time</li>
                      <li>Access detailed reports and trend analysis</li>
                      <li>Download data exports and visualizations</li>
                      <li>Set up custom alerts for key metrics</li>
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
                      <li>Configure data pipelines and collection rules</li>
                      <li>Manage cross-client analytics and benchmarks</li>
                      <li>Create custom dashboard templates</li>
                      <li>Monitor data quality and completeness</li>
                      <li>Set up automated reporting schedules</li>
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
                      <li>Monthly analytics and dashboard subscriptions</li>
                      <li>Advanced reporting packages</li>
                      <li>Custom data warehouse access</li>
                      <li>API access for data integrations</li>
                    </ul>
                    {/* TODO: Add specific Whop/Stripe checkout URLs for analytics packages */}
                    <p className="mt-4 text-sm text-white/50">
                      <em>Checkout integration: Links to be added for data intelligence packages</em>
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
              Intelligence Pipeline
            </h2>

            <div className="grid md:grid-cols-5 gap-4">
              {/* Step 1: Collect */}
              <div className="relative">
                <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 z-10">
                  <svg className="w-4 h-4 text-[#4169E1]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </div>
                <div className="p-6 rounded-xl border border-[#4169E1]/30 bg-[#4169E1]/10 text-center h-full">
                  <div className="text-4xl mb-3">📥</div>
                  <h3 className="text-lg font-bold mb-2 text-[#4169E1]">1. Collect</h3>
                  <p className="text-sm text-white/70">
                    Gather data from all sources
                  </p>
                </div>
              </div>

              {/* Step 2: Process */}
              <div className="relative">
                <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 z-10">
                  <svg className="w-4 h-4 text-[#4169E1]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </div>
                <div className="p-6 rounded-xl border border-[#4169E1]/30 bg-[#4169E1]/10 text-center h-full">
                  <div className="text-4xl mb-3">⚙️</div>
                  <h3 className="text-lg font-bold mb-2 text-[#4169E1]">2. Process</h3>
                  <p className="text-sm text-white/70">
                    Clean and transform data
                  </p>
                </div>
              </div>

              {/* Step 3: Analyze */}
              <div className="relative">
                <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 z-10">
                  <svg className="w-4 h-4 text-[#4169E1]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </div>
                <div className="p-6 rounded-xl border border-[#4169E1]/30 bg-[#4169E1]/10 text-center h-full">
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className="text-lg font-bold mb-2 text-[#4169E1]">3. Analyze</h3>
                  <p className="text-sm text-white/70">
                    Extract patterns and insights
                  </p>
                </div>
              </div>

              {/* Step 4: Visualize */}
              <div className="relative">
                <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 z-10">
                  <svg className="w-4 h-4 text-[#4169E1]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </div>
                <div className="p-6 rounded-xl border border-[#4169E1]/30 bg-[#4169E1]/10 text-center h-full">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="text-lg font-bold mb-2 text-[#4169E1]">4. Visualize</h3>
                  <p className="text-sm text-white/70">
                    Create dashboards and reports
                  </p>
                </div>
              </div>

              {/* Step 5: Act */}
              <div className="p-6 rounded-xl border border-[#4169E1]/30 bg-[#4169E1]/10 text-center h-full">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-bold mb-2 text-[#4169E1]">5. Act</h3>
                <p className="text-sm text-white/70">
                  Make informed decisions
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
              Transform Data Into Action
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Book a session to see how comprehensive analytics can drive your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://client.audiojones.com/login"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#4169E1] to-[#00CED1] text-white font-bold text-lg hover:opacity-90 transition"
              >
                Book a Session
              </Link>
              <Link
                href="/systems/data-intelligence#portal-overview"
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
