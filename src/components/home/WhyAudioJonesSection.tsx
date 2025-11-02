// Why Audio Jones Section - Authority and differentiation
export default function WhyAudioJonesSection() {
  const differentiators = [
    {
      icon: "🏢",
      title: "Miami-Based, Worldwide Impact",
      description: "Rooted in Miami's entrepreneurial energy, serving creators globally with systems that scale."
    },
    {
      icon: "🤖",
      title: "AI-First Approach",
      description: "We don't just use AI tools—we build custom AI systems specifically for your business model."
    },
    {
      icon: "📊",
      title: "Data-Driven Results",
      description: "Every decision backed by analytics. No guesswork, just predictable growth strategies."
    },
    {
      icon: "🎯",
      title: "Creator Economy Experts",
      description: "We live and breathe the creator economy. We understand your challenges because we face them too."
    },
    {
      icon: "⚡",
      title: "Systems Thinking",
      description: "Everything we build connects. Your content, marketing, sales, and operations work as one machine."
    },
    {
      icon: "🚀",
      title: "Proven Track Record",
      description: "500+ automation systems built. Millions in creator revenue generated. Real results, not hype."
    }
  ];

  const achievements = [
    { number: "500+", label: "AI Systems Deployed" },
    { number: "25x", label: "Average ROI" },
    { number: "340%", label: "Revenue Growth" },
    { number: "2M+", label: "Content Views Generated" }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#008080] text-sm font-medium tracking-wide uppercase bg-[#008080]/10 px-4 py-2 rounded-full border border-[#008080]/20 inline-block mb-6">
            Why Choose Audio Jones
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            We Don't Just Build Systems—<br />
            <span className="text-[#FF4500]">We Build Revenue Machines</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Other agencies talk about marketing. We deliver systematic growth through 
            AI-powered automation that works while you sleep.
          </p>
        </div>

        {/* Achievements Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-[#FFD700] mb-2">
                {achievement.number}
              </div>
              <div className="text-gray-400 text-sm">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>

        {/* Differentiators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <div 
              key={index}
              className="bg-black/50 border border-gray-800 rounded-xl p-6 hover:border-[#FF4500]/50 transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#FF4500]/5 to-[#FFD700]/5 border border-[#FFD700]/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <blockquote className="text-xl lg:text-2xl font-medium text-white mb-6">
              "We're not just another marketing agency. We're creators who built systems 
              to scale our own businesses—and now we're sharing those exact systems with you."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF4500] to-[#FFD700] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AJ</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Audio Jones Team</div>
                <div className="text-gray-400 text-sm">AJ DIGITAL LLC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}