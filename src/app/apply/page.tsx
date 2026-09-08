import type { Metadata } from "next";
import { Suspense } from "react";
import ApplyForm from "@/components/apply/ApplyForm";
import FAQ from "@/components/founder-intelligence/FAQ";
import { Eyebrow } from "@/components/ui/Eyebrow";
import JsonLd from "@/components/seo/JsonLd";
import {
  faqJsonLd,
  organizationJsonLd,
  personJsonLd,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

const DESCRIPTION =
  "Tell Audio Jones what you need help with, from a specific service to broader business systems.";

const inquiryFaqs = [
  {
    question: "Can I ask about one service?",
    answer: "Yes. Describe the specific help you need. You do not need to request a broader systems engagement.",
  },
  {
    question: "What if I don’t know which offer fits?",
    answer: "Choose ‘Not sure yet’ and describe what needs attention.",
  },
  {
    question: "Does sending an inquiry commit me to paid work?",
    answer: "No. We agree on scope and next steps after reviewing your request.",
  },
];

export const metadata: Metadata = {
  title: "Service Inquiry",
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/apply` },
  openGraph: {
    title: "Service Inquiry | Audio Jones",
    description: DESCRIPTION,
    url: `${siteConfig.url}/apply`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Service Inquiry | Audio Jones",
    description: DESCRIPTION,
  },
};

export default function ApplyPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={personJsonLd()} />
      <JsonLd data={faqJsonLd(inquiryFaqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Service Inquiry | Audio Jones",
          url: `${siteConfig.url}/apply`,
          description: DESCRIPTION,
          isPartOf: { "@type": "WebSite", url: siteConfig.url },
        }}
      />

      <section className="bg-bg-0 py-24 sm:py-32">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <header className="mx-auto mb-14 max-w-[640px]">
            <Eyebrow>Apply</Eyebrow>
            <h1 className="mt-4 t-h1 text-balance">
              Tell us what you need help with.
            </h1>
            <p className="mt-5 t-lead text-fg-2">
              You can ask about a specific service or broader business systems.
              If you’re unsure which offer fits, choose “Not sure yet” and
              describe what needs attention.
            </p>
            <p className="mt-4 t-body text-fg-2">
              Sending an inquiry does not commit you to a paid engagement. We
              agree on scope and next steps after reviewing your request.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-2 t-small text-fg-3 sm:grid-cols-3">
              <li>· Reviewed personally</li>
              <li>· No automated bot replies</li>
              <li>· Founder-led service businesses</li>
            </ul>
          </header>

          <section className="mx-auto mb-14 max-w-[760px] rounded-xl border border-border-subtle bg-surface-1 p-6 sm:p-8">
            <Eyebrow>Direct Answer</Eyebrow>
            <h2 className="mt-4 t-h3 text-fg-0">
              Ask about a specific service or broader business systems.
            </h2>
            <p className="mt-4 t-body text-fg-2">
              We review what you need help with before recommending an appropriate
              next step.
            </p>
            <div className="mt-8">
              <FAQ items={inquiryFaqs} />
            </div>
          </section>

          {/* Suspense boundary required because <ApplyForm> uses
              useSearchParams() — without it, /apply throws a prerender
              error in Next.js 15+ App Router. The fallback renders a
              minimal skeleton so the form area isn't empty during the
              brief client-hydration window. */}
          <Suspense fallback={<ApplyFormSkeleton />}>
            <ApplyForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}

function ApplyFormSkeleton() {
  return (
    <div
      aria-hidden
      className="mx-auto flex w-full max-w-[640px] flex-col gap-12 opacity-50"
    >
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col gap-5">
          <div className="h-3 w-32 rounded bg-bg-2" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="h-11 rounded-md bg-bg-2" />
            <div className="h-11 rounded-md bg-bg-2" />
          </div>
        </div>
      ))}
      <div className="h-12 w-48 rounded-md bg-bg-2" />
    </div>
  );
}
