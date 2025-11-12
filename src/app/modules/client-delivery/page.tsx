import { Metadata } from "next";
import Link from "next/link";
import IKImage from "@/components/IKImage";

export const metadata: Metadata = {
  title: "Client Delivery Module | Audio Jones",
  description: "Streamlined client delivery system with project management, progress tracking, and automated reporting for Audio Jones services.",
  keywords: ["client delivery", "project management", "progress tracking", "automated reporting", "client portal"],
};

export default function ClientDeliveryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Module Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#008080]/20 border border-[#008080]/30 mb-8">
              <div className="w-2 h-2 bg-[#008080] rounded-full animate-pulse mr-3"></div>
              <span className="text-sm font-medium text-[#008080]">Brand Module</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#008080] to-[#FFD700] bg-clip-text text-transparent">
                Client Delivery
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-4">
              Seamless Project Management & Client Experience
            </p>

            {/* Description */}
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                Our Client Delivery Module ensures exceptional service delivery through 
                automated project management, real-time progress tracking, and transparent communication.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Delivery System Features
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {/* Project Management */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#008080]/10 to-transparent border border-[#008080]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#008080] to-[#FFD700] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Project Management</h3>
                <p className="text-white/70 mb-6">
                  Comprehensive project tracking with milestones, deadlines, and automated 
                  progress updates for both clients and team members.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#008080] rounded-full mr-3"></div>
                    Milestone tracking
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#008080] rounded-full mr-3"></div>
                    Deadline management
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#008080] rounded-full mr-3"></div>
                    Resource allocation
                  </li>
                </ul>
              </div>

              {/* Client Portal */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#FFD700]/10 to-transparent border border-[#FFD700]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FFD700] to-[#FF4500] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Client Portal</h3>
                <p className="text-white/70 mb-6">
                  Dedicated client dashboard providing real-time project visibility, 
                  deliverable access, and direct communication channels.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                    Real-time progress tracking
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                    Deliverable downloads
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                    Direct messaging
                  </li>
                </ul>
              </div>

              {/* Quality Assurance */}
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#FF4500]/10 to-transparent border border-[#FF4500]/20">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF4500] to-[#008080] rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Quality Assurance</h3>
                <p className="text-white/70 mb-6">
                  Automated quality checks, review processes, and approval workflows 
                  to ensure every deliverable meets our high standards.
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FF4500] rounded-full mr-3"></div>
                    Automated quality checks
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FF4500] rounded-full mr-3"></div>
                    Review workflows
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#FF4500] rounded-full mr-3"></div>
                    Client approval system
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Process */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Delivery Process
            </h2>
            
            <div className="grid md:grid-cols-5 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-[#008080] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">1</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Project Initiation</h3>
                <p className="text-sm text-white/70">
                  Automated project setup with client requirements, timelines, and resource allocation
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-[#FFD700] to-[#FF4500] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">2</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Development Phase</h3>
                <p className="text-sm text-white/70">
                  Real-time progress tracking with milestone notifications and client updates
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-[#FF4500] to-[#008080] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Quality Review</h3>
                <p className="text-sm text-white/70">
                  Comprehensive quality assurance with automated checks and team review
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-[#008080] to-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">4</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Client Approval</h3>
                <p className="text-sm text-white/70">
                  Streamlined approval process with client feedback integration and revisions
                </p>
              </div>

              {/* Step 5 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-white to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">5</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Final Delivery</h3>
                <p className="text-sm text-white/70">
                  Complete deliverable package with documentation and ongoing support setup
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Portal Features */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Client Portal Dashboard
            </h2>
            
            <div className="bg-gradient-to-r from-[#008080]/10 to-[#FFD700]/10 rounded-2xl p-8 border border-[#008080]/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Real-Time Features</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#008080] rounded-full mr-4"></div>
                      <div>
                        <h4 className="font-semibold">Live Progress Tracking</h4>
                        <p className="text-sm text-white/70">See exactly where your project stands in real-time</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#FFD700] rounded-full mr-4"></div>
                      <div>
                        <h4 className="font-semibold">Instant Notifications</h4>
                        <p className="text-sm text-white/70">Get notified immediately when milestones are reached</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#FF4500] rounded-full mr-4"></div>
                      <div>
                        <h4 className="font-semibold">Direct Communication</h4>
                        <p className="text-sm text-white/70">Message your team directly through the portal</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6">Access & Control</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-white rounded-full mr-4"></div>
                      <div>
                        <h4 className="font-semibold">Deliverable Library</h4>
                        <p className="text-sm text-white/70">Access all your files and deliverables in one place</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#008080] rounded-full mr-4"></div>
                      <div>
                        <h4 className="font-semibold">Approval Workflows</h4>
                        <p className="text-sm text-white/70">Review and approve deliverables with integrated feedback</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#FFD700] rounded-full mr-4"></div>
                      <div>
                        <h4 className="font-semibold">Billing & Invoices</h4>
                        <p className="text-sm text-white/70">Transparent billing with detailed invoices and payment tracking</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Automation & Reporting */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Automated Reporting & Analytics
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#008080]/10 to-transparent border border-[#008080]/20">
                <h3 className="text-2xl font-bold mb-4">Performance Reports</h3>
                <p className="text-white/70 mb-6">
                  Automated generation of comprehensive project performance reports with 
                  key metrics, timeline analysis, and client satisfaction scores.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Project Completion Rate</span>
                    <span className="text-[#008080] font-bold">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">On-Time Delivery</span>
                    <span className="text-[#FFD700] font-bold">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Client Satisfaction</span>
                    <span className="text-[#FF4500] font-bold">4.9/5</span>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-b from-[#FFD700]/10 to-transparent border border-[#FFD700]/20">
                <h3 className="text-2xl font-bold mb-4">Predictive Analytics</h3>
                <p className="text-white/70 mb-6">
                  AI-powered insights that predict project outcomes, identify potential 
                  bottlenecks, and recommend optimization strategies.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#FFD700] rounded-full mr-3"></div>
                    <span className="text-white/80">Risk Assessment</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#008080] rounded-full mr-3"></div>
                    <span className="text-white/80">Timeline Optimization</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-[#FF4500] rounded-full mr-3"></div>
                    <span className="text-white/80">Resource Planning</span>
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
              Experience Seamless Client Delivery
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Join clients who have transformed their project experience with our delivery system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/portal"
                className="px-8 py-3 bg-gradient-to-r from-[#008080] to-[#FFD700] text-black font-bold rounded-lg hover:scale-105 transition-transform"
              >
                Access Portal
              </Link>
              <Link 
                href="/book"
                className="px-8 py-3 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition"
              >
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}