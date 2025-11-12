import { Metadata } from "next";
import Link from "next/link";
import IKImage from "@/components/IKImage";

export const metadata: Metadata = {
  title: "AI Optimization Module | Audio Jones",
  description: "Advanced AI optimization platform for performance enhancement, automated decision making, and intelligent resource allocation.",
  keywords: ["AI optimization", "performance enhancement", "automated decisions", "machine learning", "intelligent systems"],
};

export default function AIOptimizationPage() {
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
              <span className="bg-gradient-to-r from-[#FF4500] to-[#008080] bg-clip-text text-transparent">
                AI Optimization
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-4">
              Intelligent Performance Enhancement & Automation
            </p>

            {/* Description */}
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                Harness the power of advanced AI to optimize every aspect of your business operations. 
                From automated decision-making to predictive resource allocation, our AI engine drives maximum efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Engine Status */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              AI Engine Status
            </h2>
            
            <div className="grid lg:grid-cols-4 gap-6 mb-12">
              {/* System Health */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-[#008080]/20 to-transparent border border-[#008080]/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#008080] rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm text-white/60">System Health</span>
                  </div>
                  <span className="text-2xl">🟢</span>
                </div>
                <div className="text-2xl font-bold text-[#008080] mb-2">99.7%</div>
                <div className="text-sm text-white/60">Operational</div>
              </div>

              {/* Processing Speed */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-[#FFD700]/20 to-transparent border border-[#FFD700]/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#FFD700] rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm text-white/60">Processing Speed</span>
                  </div>
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="text-2xl font-bold text-[#FFD700] mb-2">2.3ms</div>
                <div className="text-sm text-white/60">Average Response</div>
              </div>

              {/* Active Models */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-[#FF4500]/20 to-transparent border border-[#FF4500]/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#FF4500] rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm text-white/60">Active Models</span>
                  </div>
                  <span className="text-2xl">🧠</span>
                </div>
                <div className="text-2xl font-bold text-[#FF4500] mb-2">47</div>
                <div className="text-sm text-white/60">Running Concurrently</div>
              </div>

              {/* Optimization Score */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-white/20 to-transparent border border-white/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm text-white/60">Optimization Score</span>
                  </div>
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">94.2</div>
                <div className="text-sm text-white/60">Performance Index</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Optimization Features */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Optimization Capabilities
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {/* Performance Optimization */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#008080]/10 to-transparent border border-[#008080]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#008080] to-[#FFD700] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Performance Optimization</h3>
                <p className="text-white/70 mb-6">
                  Real-time system optimization using machine learning algorithms to 
                  maximize efficiency and minimize resource waste across all operations.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#008080] rounded-full mr-3"></div>
                    Resource allocation optimization
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#008080] rounded-full mr-3"></div>
                    Workflow efficiency analysis
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#008080] rounded-full mr-3"></div>
                    Bottleneck identification
                  </li>
                </ul>
              </div>

              {/* Automated Decision Making */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#FFD700]/10 to-transparent border border-[#FFD700]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FFD700] to-[#FF4500] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Automated Decision Making</h3>
                <p className="text-white/70 mb-6">
                  Intelligent decision engines that learn from data patterns and business 
                  rules to make optimal choices in real-time without human intervention.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                    Rule-based automation
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                    Contextual decision trees
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                    Learning algorithms
                  </li>
                </ul>
              </div>

              {/* Predictive Scaling */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#FF4500]/10 to-transparent border border-[#FF4500]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4500] to-[#008080] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Predictive Scaling</h3>
                <p className="text-white/70 mb-6">
                  Anticipate demand patterns and automatically scale resources up or down 
                  to maintain optimal performance while controlling costs.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FF4500] rounded-full mr-3"></div>
                    Demand forecasting
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FF4500] rounded-full mr-3"></div>
                    Auto-scaling algorithms
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FF4500] rounded-full mr-3"></div>
                    Cost optimization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Machine Learning Models */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Active ML Models
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Customer Behavior Model */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-[#008080]/10 to-[#FFD700]/10 border border-[#008080]/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Customer Behavior Model</h3>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#008080] rounded-full mr-2"></div>
                    <span className="text-sm text-[#008080]">Active</span>
                  </div>
                </div>
                <p className="text-white/70 mb-4">
                  Deep learning model analyzing customer interactions to predict purchasing behavior, 
                  churn risk, and optimal engagement timing.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-[#008080]">92.3%</div>
                    <div className="text-sm text-white/60">Accuracy Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#FFD700]">47ms</div>
                    <div className="text-sm text-white/60">Processing Time</div>
                  </div>
                </div>
              </div>

              {/* Content Optimization Model */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-[#FFD700]/10 to-[#FF4500]/10 border border-[#FFD700]/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Content Optimization Model</h3>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#FFD700] rounded-full mr-2"></div>
                    <span className="text-sm text-[#FFD700]">Active</span>
                  </div>
                </div>
                <p className="text-white/70 mb-4">
                  NLP-powered model that analyzes content performance and automatically 
                  optimizes messaging, timing, and targeting for maximum engagement.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-[#FFD700]">74%</div>
                    <div className="text-sm text-white/60">Engagement Lift</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#FF4500]">156ms</div>
                    <div className="text-sm text-white/60">Generation Time</div>
                  </div>
                </div>
              </div>

              {/* Revenue Prediction Model */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-[#FF4500]/10 to-[#008080]/10 border border-[#FF4500]/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Revenue Prediction Model</h3>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#FF4500] rounded-full mr-2"></div>
                    <span className="text-sm text-[#FF4500]">Active</span>
                  </div>
                </div>
                <p className="text-white/70 mb-4">
                  Advanced forecasting model combining market data, customer behavior, 
                  and seasonal patterns to predict revenue with high accuracy.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-[#FF4500]">89.7%</div>
                    <div className="text-sm text-white/60">Forecast Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#008080]">30d</div>
                    <div className="text-sm text-white/60">Prediction Range</div>
                  </div>
                </div>
              </div>

              {/* Anomaly Detection Model */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-white/10 to-[#008080]/10 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Anomaly Detection Model</h3>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
                    <span className="text-sm text-white">Active</span>
                  </div>
                </div>
                <p className="text-white/70 mb-4">
                  Real-time anomaly detection system monitoring all business metrics 
                  to identify unusual patterns and potential issues before they impact performance.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-white">99.1%</div>
                    <div className="text-sm text-white/60">Detection Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#008080]">2.1s</div>
                    <div className="text-sm text-white/60">Alert Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Results */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Optimization Results
            </h2>
            
            <div className="space-y-8">
              {/* Efficiency Gains */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-[#008080]/10 to-[#FFD700]/10 border border-[#008080]/20">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Operational Efficiency Gains</h3>
                  <p className="text-white/70">
                    Measurable improvements across key business metrics through AI optimization
                  </p>
                </div>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#008080] mb-2">+43%</div>
                    <div className="text-sm text-white/60">Processing Speed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#FFD700] mb-2">-67%</div>
                    <div className="text-sm text-white/60">Resource Waste</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#FF4500] mb-2">+89%</div>
                    <div className="text-sm text-white/60">Decision Speed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">+156%</div>
                    <div className="text-sm text-white/60">Cost Efficiency</div>
                  </div>
                </div>
              </div>

              {/* Real-time Optimization */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-[#FFD700]/10 to-[#FF4500]/10 border border-[#FFD700]/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Real-time Optimization</h3>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#FFD700] rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm text-[#FFD700]">Live</span>
                  </div>
                </div>
                <p className="text-white/70 mb-6">
                  Continuous optimization engine making thousands of micro-adjustments per second 
                  to maintain peak performance across all systems.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/80">Campaign Performance</span>
                      <span className="text-[#FFD700]">+23% today</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Resource Utilization</span>
                      <span className="text-[#008080]">87% optimal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Response Times</span>
                      <span className="text-[#FF4500]">-45ms avg</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/80">Cost Per Acquisition</span>
                      <span className="text-[#FFD700]">-34% reduction</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Conversion Rate</span>
                      <span className="text-[#008080]">+67% lift</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Error Rate</span>
                      <span className="text-[#FF4500]">0.02% current</span>
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
              Unleash AI-Powered Performance
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Transform your operations with intelligent optimization that learns and adapts continuously
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/portal"
                className="px-8 py-3 bg-gradient-to-r from-[#FF4500] to-[#008080] text-white font-bold rounded-lg hover:scale-105 transition-transform"
              >
                Access AI Engine
              </Link>
              <Link 
                href="/book"
                className="px-8 py-3 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}