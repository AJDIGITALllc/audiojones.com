import IKImage from "@/components/IKImage";
import { MoveRight, MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <main>
      <div className="relative min-h-screen w-full overflow-x-hidden">
        {/* Background Decorative Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[90vh]
                     bg-gradient-to-tr from-[#FF4500]/20 via-transparent to-transparent
                     rounded-full blur-[120px] pointer-events-none"
        />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1200px] flex-col-reverse items-center justify-center gap-12 px-4 py-24 md:flex-row md:items-center md:justify-between md:px-6 md:py-32">
          {/* Left Side: Text Stack */}
          <div className="flex max-w-2xl flex-col items-center gap-6 text-center md:items-start md:text-left">
            <p className="font-semibold uppercase tracking-[0.12em] text-[#FFD700] text-xs sm:text-sm bg-[#FF4500]/10 px-3 py-1 rounded-full">
              South Florida’s AI Marketing & Podcast Studio
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
              Miami Consultant for Personal Branding, Podcast Production, and AI Marketing
            </h1>
            <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-white/80">
              Build authority, automate growth, and amplify your voice from our studio serving South Florida leaders and entrepreneurs.
            </p>
            <p className="flex items-center gap-2 text-sm text-white/60">
              <MapPin size={16} />
              Circle House Studios — 13700 NW 1st Ave, Miami, FL 33168
            </p>
            <div className="mt-4 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
              <a
                href="/book"
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] bg-animated px-8 font-bold text-black shadow-[0_0_30px_rgba(255,69,0,0.35)] transition-transform duration-300 ease-in-out hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-orange-300/50 active:scale-95"
              >
                <span className="relative truncate">Book a Strategy Call</span>
              </a>
              <a
                href="#services"
                className="group relative inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-transparent px-8 font-bold text-white/80 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black active:scale-95"
              >
                <span className="truncate">Explore Services</span>
                <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Side: Image Section */}
          <div className="relative w-full max-w-xs shrink-0 sm:max-w-sm md:w-2/5 md:max-w-md">
            <div className="relative aspect-square">
              {/* Radial Gradient Overlay Behind Image */}
              <div className="absolute inset-0 -m-8 rounded-full bg-gradient-radial from-[#FF4500]/20 to-transparent blur-3xl pointer-events-none" />
              <IKImage
                src="https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIOJONES_HERO_IMAGE_03.svg?updatedAt=1761600307013"
                alt="Audio Jones AI Marketing Consultant and Podcast Producer in Miami"
                width={800}
                height={800}
                priority
                className="h-full w-full object-contain object-center drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Placeholder for below-the-fold content to allow scrolling */}
      <div id="services" className="h-screen bg-black" />
    </main>
  );
}