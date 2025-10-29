'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "Can you optimize my Google Business Profile (GBP) and help with Local SEO?",
    answer: "Absolutely. GBP optimization is a core service. We handle everything from initial setup and verification to advanced strategies like service definition, post scheduling, and review management to boost your local search rankings in Miami and beyond."
  },
  {
    question: "Where are you located?",
    answer: "Our office and podcast studio are located inside the legendary Circle House Studios at 13700 NW 1st Ave, Miami, FL 33168. All sessions are by appointment only."
  },
  {
    question: "What is AEO and how is it different from SEO?",
    answer: "AEO (Answer Engine Optimization) is the next evolution of SEO. While SEO focuses on ranking in lists of links, AEO focuses on becoming the single, definitive answer in voice search, AI assistants (like Siri or Alexa), and rich snippets. It requires structured data (Schema), clear entity definition (your brand, products, expertise), and content that directly answers user questions."
  },
  {
    question: "Who do you typically work with?",
    answer: "We partner with established creators, artists, and service-based SMBs (small-to-medium businesses) in Miami and South Florida who need to build authority and generate inbound leads. Our clients are experts in their field but struggle to scale their message and stand out from the noise."
  },
  {
    question: "What are your rates?",
    answer: "Our services are tailored to each client's specific needs, from one-off strategy sessions to fully managed Studio Systems. We build custom packages based on your goals. The first step is to book a free, no-obligation strategy call to discuss your project."
  }
];

const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-white/10">
    <button
      onClick={onClick}
      className="flex justify-between items-center w-full py-5 text-left"
      aria-expanded={isOpen}
    >
      <span className="font-medium text-lg text-white">{question}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </motion.span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pb-5 pr-4 text-white/80">{answer}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#111]">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Your questions about AEO, our process, and how we drive growth, answered.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
