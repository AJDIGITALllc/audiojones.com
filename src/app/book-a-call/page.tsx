import type { Metadata } from "next";
import {
  DarkSection,
  LightProofSection,
  SectionIntro,
  SignalHero,
} from "@/components/marketing/DesignSystemSections";
import { ButtonLink } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo/metadata";

const DESCRIPTION =
  "Request a conversation about a specific service or broader business systems.";

export const metadata: Metadata = buildMetadata({
  title: "Book a Call",
  description: DESCRIPTION,
  path: "/book-a-call",
});

export default function BookACallPage() {
  return (
    <>
      <SignalHero
        title="Tell us what needs attention."
        description={DESCRIPTION}
        primaryHref="/apply"
        primaryLabel="Tell us what you need"
        secondaryHref="/ai-readiness-diagnostic"
        secondaryLabel="Explore AI readiness — optional"
      >
        {/* Explicitly suppress SignalHero's default systems illustration here. */}
        {false}
      </SignalHero>

      <DarkSection>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionIntro
            label="Before we talk"
            title="A useful conversation starts with a specific need."
            description="Tell us what needs attention, what you have already tried, and what help you are looking for."
          />
          <div className="aj-form-panel">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--aj-orange)]">
              Booking Path
            </p>
            <h2 className="mt-4 font-accent text-3xl font-bold tracking-[-0.03em] text-fg-0">
              Send your inquiry first.
            </h2>
            <p className="mt-4 text-sm leading-7 text-fg-2">
              We review inquiries before scheduling calls. Describe the help you
              need so we can determine the appropriate next step.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/apply" variant="glow">
                Tell us what you need
              </ButtonLink>
              <ButtonLink href="/roi-calculator" variant="secondary">
                Calculate Lost Revenue
              </ButtonLink>
            </div>
          </div>
        </div>
      </DarkSection>

      <LightProofSection>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Founder-led", "Best fit for businesses where founder expertise still shapes sales, delivery, or operations."],
            ["Specific need", "You can ask about one service, such as Google Business Profile improvements, or a broader business problem."],
            ["Agreed next step", "We review your request before recommending a service, further discovery, or another next step."],
          ].map(([title, copy]) => (
            <div key={title} className="aj-proof-card">
              <h3 className="font-accent text-2xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-[#4b5563]">{copy}</p>
            </div>
          ))}
        </div>
      </LightProofSection>
    </>
  );
}
