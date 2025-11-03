import { CTA_LINKS } from "@/config/marketing";

const faqs = [
  {
    label: "1",
    question: "How do we start the content creation process?",
    answer:
      "We start with a content + offer strategy session, then map one recording day that becomes 30 days of omni-channel content.",
  },
  {
    label: "2",
    question: "What happens after recording?",
    answer:
      "Our team edits the long-form episode, pulls 6–12 micro clips, designs thumbnails, and preps captions. We can push to your scheduler for hands-free publishing.",
  },
  {
    label: "3",
    question: "How do AI systems fit into all of this?",
    answer:
      "We integrate AI + automation (MailerLite, n8n, Whop) so your show feeds your list, offers, and private communities automatically.",
  },
];

export default function FAQSection() {
  return (
    <section
      className="relative py-24 text-white"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/Backgrounds/Audio_Jones_Website_Backgrounds_%20(8).png?updatedAt=1761600049315')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">FAQ / How It Works</p>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold">
          Frequently Asked Questions — How Our 3-Step Content Engine Works
        </h2>
        <p className="mt-4 text-lg text-gray-200">
          These are the questions we answer first on every strategy call.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-4xl space-y-6 px-6">
        {faqs.map((faq) => (
          <article
            key={faq.label}
            className="flex items-start gap-4 rounded-2xl border border-orange-500/10 bg-black/70 px-6 py-5"
          >
            <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4500] to-[#FFD700] text-black font-bold">
              {faq.label}
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white md:text-xl">{faq.question}</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-300">{faq.answer}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="relative mt-10 flex justify-center gap-4 px-6 text-center">
        <a
          href={CTA_LINKS.bookStrategy}
          className="rounded-full bg-gradient-to-r from-[#FF4500] to-[#FFD700] px-8 py-3 text-base font-semibold text-black shadow-md transition hover:opacity-95"
        >
          Book Your Strategy
        </a>
        <a
          href={CTA_LINKS.servicesOverview}
          className="rounded-full border border-white/50 bg-black/40 px-8 py-3 text-base font-semibold text-white transition hover:border-white"
        >
          See Packages
        </a>
      </div>
    </section>
  );
}
