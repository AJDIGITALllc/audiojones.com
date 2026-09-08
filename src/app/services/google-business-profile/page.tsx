import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { A6_DRAFT } from "@/content/offers";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Google Business Profile Optimization | AJ Digital",
    description: "A bounded Google Business Profile service for local service businesses: review your details, make approved improvements, check contact paths, and hand off.",
    path: A6_DRAFT.draftPath,
  }),
  title: { absolute: "Google Business Profile Optimization | AJ Digital" },
  robots: { index: false, follow: false },
};

const deliverables = [
  ["Focused profile review", "Review the existing profile and document the issues and proposed changes."],
  ["Business information", "Review business details, hours, service coverage, categories, and services against information you confirm."],
  ["One optimization pass", "Make approved changes to supported profile fields. Google may review or restrict changes."],
  ["Client-supplied photos", "Prepare and upload up to 10 usable photos you provide, subject to platform acceptance."],
  ["Contact-path checks", "Check the linked website destination and contact path. Document website issues for separate attention."],
  ["Review-request materials", "Provide one review-request link and two reusable templates: one for requesting an honest review and one for responding."],
  ["Baseline and handoff", "Capture available profile data with its reporting period and limitations, then provide a change log and open-issues list."],
  ["Revision and support", "Include one client revision round and one handoff session of up to 45 minutes. Delivery-error coverage is described below."],
];

const steps = [
  ["Confirm access and fit", "We confirm that you can authorize the work, that the profile is accessible, and that the standard scope fits. You supply accurate business information and usable assets."],
  ["Review and agree", "We review the profile and prepare a specific change list for your approval. This focused discovery is included in the engagement. It is not a comprehensive SEO/AEO diagnostic."],
  ["Make approved improvements", "We complete one implementation pass using the agreed information and assets. We do not add artificial business-name keywords, fabricated locations, or unsupported service coverage."],
  ["Check and hand off", "We check the website destination and review-request link, record the status of changes, and walk you through the handoff. Changes awaiting Google’s approval are reported as pending."],
];

const exclusions = [
  "New or additional profiles, multi-location work, reinstatement appeals, or ownership disputes.",
  "Website changes, analytics installation, blog posts, city pages, bulk citations, or link acquisition.",
  "Photography, substantial image production, or ongoing content creation.",
  "Automated review requests, ongoing review responses, or review-management software.",
  "CRM implementation, missed-call texting, voice agents, paid advertising, or custom dashboards.",
  "Third-party software or usage fees.",
  "Ongoing monitoring or recurring profile management.",
];

export default function GoogleBusinessProfilePage() {
  // This draft must not become a hosted page through an ordinary production build.
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <main className="min-h-screen bg-bg-0 text-fg-0">
      <section className="border-b border-[var(--line-2)] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Eyebrow>Google Business Profile Foundation</Eyebrow>
          <h1 className="mt-5 t-h1 max-w-4xl text-balance" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Google Business Profile optimization</h1>
          <p className="mt-6 t-lead max-w-3xl text-fg-2">For local service businesses.</p>
          <p className="mt-5 t-body-lg max-w-3xl text-fg-2">We improve your business details, services, photos, and contact links through a focused, one-time engagement.</p>
          <div className="mt-8"><ButtonLink href={A6_DRAFT.cta.href} variant="glow">{A6_DRAFT.cta.label}</ButtonLink></div>
          <p className="mt-8 t-body-lg max-w-3xl text-fg-2">AJ Digital’s {A6_DRAFT.name} is a focused, one-time engagement. We review what is there, agree on the changes, make approved improvements, and document what was published, remains pending, or needs further attention.</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl divide-y divide-[var(--line-2)] px-5 sm:px-8">
        <section className="py-12 sm:py-16" aria-labelledby="audience">
          <h2 id="audience" className="t-h2">Who this is for</h2>
          <p className="mt-5 t-body-lg text-fg-2">This service is for local service businesses with an existing Google Business Profile that needs clearer services, more complete information, updated photos, or working links that help customers contact you.</p>
          <p className="mt-4 t-body text-fg-2">The standard scope covers one business, one eligible profile, one linked website, and one agreed content language. You retain ownership of your profile and assets.</p>
          <p className="mt-4 t-body text-fg-2">Ownership disputes, verification problems, and suspended profiles need separate assessment before standard delivery can begin.</p>
        </section>

        <section className="py-12 sm:py-16" aria-labelledby="included">
          <h2 id="included" className="t-h2">What is included</h2>
          <dl className="mt-8 grid gap-8 sm:grid-cols-2">
            {deliverables.map(([title, description]) => (
              <div key={title} className="border-t border-[var(--line-2)] pt-4">
                <dt className="t-h4">{title}</dt>
                <dd className="mt-3 t-body text-fg-2">{description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="py-12 sm:py-16" aria-labelledby="process">
          <h2 id="process" className="t-h2">How the engagement works</h2>
          <ol className="mt-8 space-y-8">
            {steps.map(([title, description], index) => (
              <li key={title}>
                <h3 className="t-h4">{index + 1}. {title}</h3>
                <p className="mt-3 t-body text-fg-2">{description}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 t-body text-fg-2">We establish a delivery estimate after reviewing access and assets. Google’s review and verification timelines are outside our control.</p>
        </section>

        <section className="py-12 sm:py-16" aria-labelledby="measurement">
          <h2 id="measurement" className="t-h2">Measurement: use what already works</h2>
          <div className="mt-5 space-y-4 t-body text-fg-2">
            <p>The profile engagement includes available baseline information and a check of the website link and any agreed tracking convention. It does not include installing website analytics.</p>
            <p>If your existing measurement setup works, we reuse it. We do not automatically charge you to replace or reinstall it.</p>
            <p>If you need measurement implementation, our existing Digital Measurement Foundation offer can be scoped separately. Depending on the agreed requirements, this can include GA4, Google Tag Manager, Google Search Console, sitemap submission, and agreed baseline conversion events, followed by checks and handoff.</p>
            <p>Before quoting that work, we identify what is already functioning and what is missing. More complex analytics requirements receive their own scope rather than a duplicate foundation charge.</p>
            <p>Profile interactions and website clicks do not, by themselves, establish answered calls, qualified leads, appointments, or revenue. Reporting will distinguish those measures where reliable data is available.</p>
          </div>
        </section>

        <section className="py-12 sm:py-16" aria-labelledby="excluded">
          <h2 id="excluded" className="t-h2">What is outside this engagement</h2>
          <p className="mt-5 t-body text-fg-2">This engagement does not include:</p>
          <ul className="mt-4 list-disc space-y-3 pl-5 t-body text-fg-2">{exclusions.map((item) => <li key={item}>{item}</li>)}</ul>
          <p className="mt-6 t-body text-fg-2">We do not guarantee rankings, AI mentions, leads, or revenue.</p>
        </section>

        <section className="py-12 sm:py-16" aria-labelledby="handoff">
          <h2 id="handoff" className="t-h2">What happens after handoff?</h2>
          <div className="mt-5 space-y-4 t-body text-fg-2">
            <p>You receive the baseline, change log, review materials, open issues, and ownership/access handoff.</p>
            <p>Report errors in our agreed work within 14 calendar days after handoff. We will assess and correct confirmed delivery errors without an additional service fee. Platform decisions and new requests fall outside this coverage.</p>
            <p>Recurring support is optional and is not included automatically. If you need it, we will define the deliverables, capacity, reporting, and terms before you agree. Existing contracted work will be reviewed to avoid charging twice for the same deliverable.</p>
          </div>
        </section>

        <section className="py-12 sm:py-16" aria-labelledby="discuss">
          <h2 id="discuss" className="t-h2">Discuss your Google profile</h2>
          <p className="mt-5 t-body-lg text-fg-2">Tell us what needs attention. We will confirm whether this focused engagement fits and what information is needed to scope it.</p>
          <div className="mt-8"><ButtonLink href={A6_DRAFT.cta.href} variant="glow">{A6_DRAFT.cta.label}</ButtonLink></div>
        </section>
      </div>
    </main>
  );
}
