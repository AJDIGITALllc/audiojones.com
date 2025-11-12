import { Metadata } from "next";
import Link from "next/link";
import IKImage from "@/components/IKImage";

export const metadata: Metadata = {
  title: "Data Intelligence Module | Audio Jones",
  description: "Advanced analytics and data intelligence platform for comprehensive business insights and AI-driven decision making.",
  keywords: ["data intelligence", "analytics", "business insights", "AI analytics", "data visualization"],
};

export default function DataIntelligencePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Module Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 mb-8">
              <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse mr-3"></div>
              <span className="text-sm font-medium text-[#FFD700]">Brand Module</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#FFD700] to-[#FF4500] bg-clip-text text-transparent">
                Data Intelligence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-4">
              Advanced Analytics & Business Intelligence Platform
            </p>

            {/* Description */}
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                Transform raw data into actionable insights with our comprehensive analytics platform. 
                Powered by AI-driven analysis and real-time visualization for data-driven decision making.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard Preview */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Real-Time Analytics Dashboard
            </h2>
            
            <div className="grid lg:grid-cols-4 gap-6 mb-12">
              {/* KPI Cards */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-[#008080]/20 to-transparent border border-[#008080]/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-white/60">Revenue Growth</p>
                    <p className="text-3xl font-bold text-[#008080]">+47.2%</p>
                  </div>
                  <span className="text-2xl">📈</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-[#008080]">↗ 12.5%</span>
                  <span className="text-white/60 ml-2">vs last month</span>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-b from-[#FFD700]/20 to-transparent border border-[#FFD700]/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-white/60">Client Retention</p>
                    <p className="text-3xl font-bold text-[#FFD700]">94.8%</p>
                  </div>
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-[#FFD700]">↗ 3.2%</span>
                  <span className="text-white/60 ml-2">vs last quarter</span>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-b from-[#FF4500]/20 to-transparent border border-[#FF4500]/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-white/60">Campaign ROI</p>
                    <p className="text-3xl font-bold text-[#FF4500]">284%</p>
                  </div>
                  <span className="text-2xl">💰</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-[#FF4500]">↗ 18.7%</span>
                  <span className="text-white/60 ml-2">vs industry avg</span>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-b from-white/20 to-transparent border border-white/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-white/60">Engagement Score</p>
                    <p className="text-3xl font-bold text-white">8.7/10</p>
                  </div>
                  <span className="text-2xl">⭐</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-white">↗ 0.9</span>
                  <span className="text-white/60 ml-2">vs last period</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Intelligence Capabilities
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {/* Predictive Analytics */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#008080]/10 to-transparent border border-[#008080]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#008080] to-[#FFD700] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🔮</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Predictive Analytics</h3>
                <p className="text-white/70 mb-6">
                  AI-powered forecasting models that predict trends, identify opportunities, 
                  and anticipate market changes before they happen.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#008080] rounded-full mr-3"></div>
                    Revenue forecasting
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#008080] rounded-full mr-3"></div>
                    Customer behavior prediction
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#008080] rounded-full mr-3"></div>
                    Market trend analysis
                  </li>
                </ul>
              </div>

              {/* Real-time Monitoring */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#FFD700]/10 to-transparent border border-[#FFD700]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FFD700] to-[#FF4500] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Real-time Monitoring</h3>
                <p className="text-white/70 mb-6">
                  Live data streams with instant alerts and automated responses to 
                  critical business events and performance thresholds.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                    Live performance tracking
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                    Automated alerting
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                    Threshold monitoring
                  </li>
                </ul>
              </div>

              {/* Custom Reporting */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#FF4500]/10 to-transparent border border-[#FF4500]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4500] to-[#008080] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Custom Reporting</h3>
                <p className="text-white/70 mb-6">
                  Tailored reports and dashboards designed for your specific business needs 
                  with automated generation and distribution.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FF4500] rounded-full mr-3"></div>
                    Executive dashboards
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FF4500] rounded-full mr-3"></div>
                    Automated scheduling
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FF4500] rounded-full mr-3"></div>
                    Multi-format exports
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Sources Integration */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Unified Data Integration
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* CRM Integration */}
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <div className="w-12 h-12 bg-[#008080] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">👥</span>
                </div>
                <h3 className="font-bold mb-2">CRM Systems</h3>
                <p className="text-sm text-white/60">Customer data and interaction history</p>
              </div>

              {/* Marketing Platforms */}
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">📢</span>
                </div>
                <h3 className="font-bold mb-2">Marketing Platforms</h3>
                <p className="text-sm text-white/60">Campaign performance and engagement metrics</p>
              </div>

              {/* Financial Systems */}
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <div className="w-12 h-12 bg-[#FF4500] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">💳</span>
                </div>
                <h3 className="font-bold mb-2">Financial Systems</h3>
                <p className="text-sm text-white/60">Revenue, expenses, and payment data</p>
              </div>

              {/* Web Analytics */}
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl text-black">🌐</span>
                </div>
                <h3 className="font-bold mb-2">Web Analytics</h3>
                <p className="text-sm text-white/60">Website traffic and user behavior</p>
              </div>

              {/* Social Media */}
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <div className="w-12 h-12 bg-[#008080] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">📱</span>
                </div>
                <h3 className="font-bold mb-2">Social Media</h3>
                <p className="text-sm text-white/60">Social engagement and brand mentions</p>
              </div>

              {/* E-commerce */}
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🛒</span>
                </div>
                <h3 className="font-bold mb-2">E-commerce</h3>
                <p className="text-sm text-white/60">Sales data and customer transactions</p>
              </div>

              {/* Email Marketing */}
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <div className="w-12 h-12 bg-[#FF4500] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">📧</span>
                </div>
                <h3 className="font-bold mb-2">Email Marketing</h3>
                <p className="text-sm text-white/60">Email campaign metrics and subscriber data</p>
              </div>

              {/* Custom APIs */}
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl text-black">⚡</span>
                </div>
                <h3 className="font-bold mb-2">Custom APIs</h3>
                <p className="text-sm text-white/60">Proprietary systems and data sources</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Insights */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              AI-Powered Business Insights
            </h2>
            
            <div className="space-y-8">
              {/* Customer Intelligence */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-[#008080]/10 to-[#FFD700]/10 border border-[#008080]/20">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#008080] to-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Customer Intelligence</h3>
                    <p className="text-white/70 mb-4">
                      Deep customer analysis revealing purchasing patterns, lifetime value predictions, 
                      and personalized engagement strategies based on behavioral data.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#008080]">47%</div>
                        <div className="text-sm text-white/60">Accuracy Improvement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#FFD700]">3.2x</div>
                        <div className="text-sm text-white/60">ROI Increase</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#FF4500]">89%</div>
                        <div className="text-sm text-white/60">Prediction Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Intelligence */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-[#FFD700]/10 to-[#FF4500]/10 border border-[#FFD700]/20">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FFD700] to-[#FF4500] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Market Intelligence</h3>
                    <p className="text-white/70 mb-4">
                      Comprehensive market analysis combining industry trends, competitor insights, 
                      and emerging opportunities to guide strategic decision making.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-[#FFD700]/20 text-[#FFD700] rounded-full text-sm">Trend Analysis</span>
                      <span className="px-3 py-1 bg-[#FF4500]/20 text-[#FF4500] rounded-full text-sm">Competitor Tracking</span>
                      <span className="px-3 py-1 bg-[#008080]/20 text-[#008080] rounded-full text-sm">Opportunity Detection</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Intelligence */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-[#FF4500]/10 to-[#008080]/10 border border-[#FF4500]/20">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FF4500] to-[#008080] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Performance Intelligence</h3>
                    <p className="text-white/70 mb-4">
                      Real-time performance optimization with automated recommendations, 
                      anomaly detection, and predictive maintenance for all business processes.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#FF4500] rounded-full mr-3"></div>
                        <span className="text-white/80">Automated Optimization</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#008080] rounded-full mr-3"></div>
                        <span className="text-white/80">Anomaly Detection</span>
                      </div>
                    </div>
                  </div>
                </div>
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
              Transform Your Data Into Intelligence
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Unlock the full potential of your business data with AI-powered analytics and insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/portal"
                className="px-8 py-3 bg-gradient-to-r from-[#FFD700] to-[#FF4500] text-black font-bold rounded-lg hover:scale-105 transition-transform"
              >
                View Analytics
              </Link>
              <Link 
                href="/book"
                className="px-8 py-3 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}