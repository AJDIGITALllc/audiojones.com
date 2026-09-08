import type { Metadata } from "next";
import {
  DarkSection,
  FinalCta,
  LightProofSection,
  SectionIntro,
} from "@/components/marketing/DesignSystemSections";
import { ButtonLink } from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  personJsonLd,
} from "@/lib/seo/schema";

const DESCRIPTION =
  "Audio Jones, founder of AJ Digital LLC, helps founder-led service businesses improve inquiries, follow-up, customer information, and reporting.";

export const metadata: Metadata = buildMetadata({
  title: "About Audio Jones",
  description: DESCRIPTION,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={personJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />

      <section className="border-b border-[var(--line-2)] bg-bg-0 py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="max-w-4xl">
            <h1 className="break-words font-accent text-[clamp(2.55rem,6vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.025em] text-fg-0">I’m Audio Jones, founder of AJ Digital LLC.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-fg-2">I help founder-led service businesses improve how inquiries, follow-up, customer information, and reporting work together. My work combines consulting with implementation around the tools and workflows the business already uses.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/ai-readiness-diagnostic" variant="glow">Start the AI Readiness Diagnostic</ButtonLink>
              <ButtonLink href="/services" variant="secondary">See Services</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <DarkSection>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro
            label="How I work"
            title="Understand the work before recommending changes."
            description="I start by reviewing how work happens today: where inquiries arrive, who responds, which tools hold the information, and where handoffs get stuck. That context helps define what needs to change and what should stay."
          />
          <div className="grid gap-4">
            {[
              ["Understand", "Review the current workflow and the people responsible for it."],
              ["Agree", "Define the problem, the scope of work, and the outcome to measure."],
              ["Implement", "Build the agreed workflows, automation, and reporting around the team’s existing tools."],
            ].map(([title, copy]) => (
              <div key={title} className="aj-product-card">
                <h3 className="font-accent text-2xl font-bold tracking-[-0.02em] text-fg-0">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-fg-2">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkSection>

      <LightProofSection>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--aj-blue-deep)]">
              Core Phrase
            </p>
            <h2 className="mt-4 font-accent text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[0.98] tracking-[-0.045em]">
              Signal over noise.
            </h2>
          </div>
          <p className="text-lg leading-8 text-[#4b5563]">
            Focus on information that helps you decide what to do next: which inquiries need a response, where follow-up stalls, and what outcomes are recorded.
          </p>
        </div>
      </LightProofSection>

      <DarkSection>
        <SectionIntro
          label="Working principles"
          title="Build around the people doing the work."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Start with the current workflow.", "Understand how the business works before recommending another tool."],
            ["Make responsibilities clear.", "Define who responds, who follows up, and when a person needs to step in."],
            ["Keep the scope clear.", "Agree what the implementation includes before building it."],
            ["Check the results.", "Review how the workflow is used and what outcomes are recorded."],
          ].map(([title, copy]) => (
            <div key={title} className="aj-card-signal">
              <div className="aj-card-inner">
                <h3 className="font-accent text-2xl font-bold text-fg-0">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-fg-2">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </DarkSection>

      <FinalCta
        title="Tell us what needs attention."
        description="Ask about a specific service or a broader business-systems need. You do not need to choose an offer first."
        primaryLabel="Send an inquiry"
        primaryHref="/book-a-call"
        secondaryLabel="Start the AI Readiness Diagnostic"
        secondaryHref="/ai-readiness-diagnostic"
      />
    </>
  );
}
