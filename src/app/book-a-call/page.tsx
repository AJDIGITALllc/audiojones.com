import type { Metadata } from "next";
import {
  DarkSection,
  LightProofSection,
  SectionIntro,
} from "@/components/marketing/DesignSystemSections";
import FAQ from "@/components/founder-intelligence/FAQ";
import JsonLd from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo/schema";
import { inquiryFaqs } from "@/content/inquiry-faq";
import { ButtonLink } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo/metadata";

const DESCRIPTION =
  "Ask Audio Jones about a specific service or broader business systems. Describe what needs attention without choosing an offer first.";

export const metadata: Metadata = buildMetadata({
  title: "Book a Call",
  description: DESCRIPTION,
  path: "/book-a-call",
});

export default function BookACallPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(inquiryFaqs)} />
      <section className="border-b border-[var(--line-2)] bg-bg-0 py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="max-w-4xl">
            <h1 className="break-words font-accent text-[clamp(2.55rem,6vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.025em] text-fg-0">Tell us what you need help with.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-fg-2">Ask about a specific service or broader business systems. Describe what needs attention—you do not need to choose an offer first.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/apply" variant="glow">Send an inquiry</ButtonLink>
              <ButtonLink href="/ai-readiness-diagnostic" variant="secondary">Explore AI readiness — optional</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <DarkSection>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionIntro
            label="What to include"
            title="Start with what is happening in your business."
            description="Tell us what you need help with, how you handle it today, and what you would like to improve. A specific service question or a broader business-systems question is welcome."
          />
          <div className="aj-form-panel">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--aj-orange)]">
              What happens next
            </p>
            <h2 className="mt-4 font-accent text-3xl font-bold tracking-[-0.03em] text-fg-0">
              Send your inquiry for review.
            </h2>
            <p className="mt-4 text-sm leading-7 text-fg-2">
              This page leads to an application form, not an open calendar. Audio Jones reviews your request for fit before the next step. If a conversation is appropriate, scheduling follows the review.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/apply" variant="glow">
                Send an inquiry
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
            ["A specific service", "Describe the service you want to ask about. If it is not listed in the form, choose “Not sure yet” and explain what you need."],
            ["A broader business need", "Tell us where inquiries, follow-up, customer information, or reporting need attention. You do not need to name the solution."],
            ["An agreed next step", "Your inquiry is reviewed before an engagement is recommended. Scope and next steps are agreed after review."],
          ].map(([title, copy]) => (
            <div key={title} className="aj-proof-card">
              <h3 className="font-accent text-2xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-fg-2">{copy}</p>
            </div>
          ))}
        </div>
      </LightProofSection>
      <DarkSection>
        <h2 className="mb-6 t-h3 text-fg-0">Before you send your inquiry</h2>
        <FAQ items={inquiryFaqs} />
      </DarkSection>
    </>
  );
}
