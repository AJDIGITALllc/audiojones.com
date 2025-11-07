export default function ServicesSection() {
  return (
    <section 
      className="relative py-16 sm:py-20 lg:py-24 text-white"
      style={{
        backgroundImage: "url('https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/Backgrounds/Audio_Jones_Website_Backgrounds_%20(1).png?updatedAt=1761600049545')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#FF4500]">
            What We Build
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            Three pillars to grow authority and revenue
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-200">
            Personal branding, video podcast production, and AI marketing systems delivered as a unified growth engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Personal Branding Authority */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF4500] to-[#FFD700] rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Personal Branding Authority</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                We help you build a powerful, authentic personal brand that establishes you as a thought leader in your industry.
              </p>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <div>• Brand Strategy</div>
              <div>• Content Creation</div>
              <div>• Audience Growth</div>
            </div>
            <a 
              href="/book?service=personal-branding"
              className="mt-6 inline-flex items-center text-[#FF4500] hover:text-[#FFD700] transition font-semibold text-sm"
            >
              Learn More →
            </a>
          </div>

          {/* Video Podcast Production */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF4500] to-[#FFD700] rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎙️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Video Podcast Production</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                From concept to distribution, we handle the entire podcasting process to produce high-quality video and audio content.
              </p>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <div>• Full-Service Production</div>
              <div>• High-Quality Editing</div>
              <div>• Distribution Strategy</div>
            </div>
            <a 
              href="/book?service=podcast"
              className="mt-6 inline-flex items-center text-[#FF4500] hover:text-[#FFD700] transition font-semibold text-sm"
            >
              Learn More →
            </a>
          </div>

          {/* AI Marketing Systems */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF4500] to-[#FFD700] rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Marketing Systems</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Leverage artificial intelligence to streamline content repurposing, lead generation, and workflow optimization.
              </p>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <div>• AI Automation</div>
              <div>• Content Repurposing</div>
              <div>• Lead Generation</div>
            </div>
            <a 
              href="/book?service=ai"
              className="mt-6 inline-flex items-center text-[#FF4500] hover:text-[#FFD700] transition font-semibold text-sm"
            >
              Learn More →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}