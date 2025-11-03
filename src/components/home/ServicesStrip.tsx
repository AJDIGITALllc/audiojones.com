import { SERVICE_PILLARS } from "@/config/marketing";
import { ServiceTile } from "@/components/shared/ServiceTile";

export default function ServicesStrip() {
  return (
    <section
      id="services"
      className="relative py-20"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/Backgrounds/Audio_Jones_Website_Backgrounds_%20(1).png?updatedAt=1761600049545')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 text-white">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#FFD700]">What We Build</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Three pillars to grow authority and revenue
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Personal branding, video podcast production, and AI marketing systems delivered as a unified growth engine.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_PILLARS.map((pillar, index) => (
            <ServiceTile
              key={pillar.id}
              title={pillar.title}
              description={pillar.description}
              highlights={pillar.highlights}
              ctaHref={pillar.ctaHref}
              ctaLabel={pillar.ctaLabel}
              accent={index === 2 ? "teal" : "orange"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
