// How It Works - 3-Step System Section
export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Audit & Strategy",
      description: "We analyze your current content, audience, and revenue streams to identify the biggest opportunities.",
      features: [
        "Content performance analysis",
        "Audience behavior mapping", 
        "Revenue gap identification",
        "Technology stack assessment"
      ],
      icon: "🔍"
    },
    {
      step: "02", 
      title: "Build & Automate",
      description: "We design and implement AI-powered systems that work 24/7 to grow your business.",
      features: [
        "Custom automation workflows",
        "AI content generation",
        "Lead capture systems",
        "Conversion optimization"
      ],
      icon: "🚀"
    },
    {
      step: "03",
      title: "Scale & Optimize", 
      description: "We monitor performance and continuously optimize for maximum ROI and growth.",
      features: [
        "Real-time analytics",
        "Performance optimization",
        "A/B testing campaigns",
        "Revenue forecasting"
      ],
      icon: "📈"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#FFD700] text-sm font-medium tracking-wide uppercase bg-[#FFD700]/10 px-4 py-2 rounded-full border border-[#FFD700]/20 inline-block mb-6">
            Our Proven Process
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            How We Transform <span className="text-[#FF4500]">Creators into Systems</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Three phases. Predictable results. No more guessing what will work.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Number */}
              <div className="flex items-center mb-6">
                <div className="text-6xl font-bold text-[#FF4500]/20 mr-4">
                  {step.step}
                </div>
                <div className="text-4xl">{step.icon}</div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-3">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-6 w-12">
                  <div className="flex items-center">
                    <div className="flex-1 h-px bg-gradient-to-r from-[#FF4500] to-[#FFD700]" />
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full ml-2" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#FF4500]/10 to-[#FFD700]/10 border border-[#FF4500]/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build Your Revenue System?
            </h3>
            <p className="text-gray-300 mb-6">
              Book a strategy call and we'll show you exactly how this works for your specific situation.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#FF4500] hover:bg-[#e63e00] text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Get Your Custom Strategy
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}