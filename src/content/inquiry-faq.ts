import type { FaqItem } from "@/lib/seo/schema";

export const inquiryFaqs: FaqItem[] = [
  {
    question: "Can I ask about a specific service?",
    answer: "Yes. Describe the service you want to ask about. If it is not listed in the form, choose “Not sure yet” and explain what you need in the outcome field.",
  },
  {
    question: "Do I need to choose an offer or complete a diagnostic first?",
    answer: "No. You can send an inquiry without selecting an offer or completing a diagnostic. Describe what needs attention, and the appropriate next step can be discussed after review.",
  },
  {
    question: "Does submitting this form book a call?",
    answer: "No. The form sends an inquiry for review. If a conversation is appropriate, scheduling follows the review.",
  },
  {
    question: "Does an inquiry commit me to an engagement?",
    answer: "No. Submitting an inquiry does not commit you to a diagnostic or systems engagement. Scope and next steps are agreed after review.",
  },
];
