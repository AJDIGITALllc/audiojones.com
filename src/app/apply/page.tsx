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
import { inquiryFaqs } from "@/content/inquiry-faq";
import { siteConfig } from "@/lib/site";

const DESCRIPTION = "Send Audio Jones an inquiry about a specific service or broader business systems. Offer selection is optional. Scope and next steps are agreed after review.";

export const metadata: Metadata = {
  title: "Send an Inquiry",
  description:
    DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/apply` },
  openGraph: {
    title: "Send an Inquiry | Audio Jones",
    description:
      DESCRIPTION,
    url: `${siteConfig.url}/apply`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Send an Inquiry | Audio Jones",
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
          name: "Send an Inquiry | Audio Jones",
          url: `${siteConfig.url}/apply`,
          description:
            DESCRIPTION,
          isPartOf: { "@type": "WebSite", url: siteConfig.url },
        }}
      />

      <section className="bg-bg-0 py-24 sm:py-32">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <header className="mx-auto mb-14 max-w-[640px]">
            <Eyebrow>Your inquiry</Eyebrow>
            <h1 className="mt-4 t-h1 text-balance">
              Tell us what you need help with.
            </h1>
            <p className="mt-5 t-lead text-fg-2">
              Ask about a specific service or broader business systems. Describe what needs attention—you do not need to choose an offer first.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-2 t-small text-fg-3 sm:grid-cols-3">
              <li>· Reviewed personally</li>
              <li>· Offer selection is optional</li>
              <li>· Founder-led service businesses</li>
            </ul>
          </header>

          <section className="mx-auto mb-14 max-w-[760px] rounded-xl border border-border-subtle bg-surface-1 p-6 sm:p-8">
            <Eyebrow>Before you submit</Eyebrow>
            <h2 className="mt-4 t-h3 text-fg-0">
              Ask about focused service help or broader systems work.
            </h2>
            <p className="mt-4 t-body text-fg-2">
              Submitting an inquiry does not commit you to a diagnostic or systems engagement. Scope and next steps are agreed after review.
            </p>
            <div className="mt-8">
              <h2 className="mb-5 t-h3 text-fg-0">Questions about your inquiry</h2>
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
