import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ToastProvider } from "@/components/Toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import GlobalDisclaimer from "@/components/GlobalDisclaimer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audio Jones | AI Branding & Marketing Systems",
  description:
    "Personal branding, podcast production, and AI marketing systems built for South Florida creators and entrepreneurs.",
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon.ico", sizes: "48x48" },
    ],
    apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "manifest",
        url: "/favicons/site.webmanifest",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <ToastProvider>
          <Header />
          <div className="pt-20">{children}</div>
          <Footer />
          <GlobalDisclaimer />
          <CookieBanner />
        </ToastProvider>
        <Script
          src="https://widget.beacon.ai/audiojones?theme=dark"
          strategy="afterInteractive"
          data-beacon-id="audiojones"
        />
        <Script id="json-ld-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "Audio Jones",
                  "legalName": "AJ DIGITAL LLC",
                  "url": "https://audiojones.com",
                  "logo": "https://audiojones.com/logo.png",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+1-786-645-2250",
                    "contactType": "Customer Service",
                    "email": "contact@audiojones.com"
                  },
                  "sameAs": []
                },
                {
                  "@type": "LocalBusiness",
                  "name": "Audio Jones",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "13700 NW 1st Ave",
                    "addressLocality": "Miami",
                    "addressRegion": "FL",
                    "postalCode": "33168",
                    "addressCountry": "US"
                  },
                  "telephone": "+1-786-645-2250",
                  "email": "contact@audiojones.com",
                  "priceRange": "$$$"
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Why is it harder to stand out now that so much content is AI-generated?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Because 50%+ of content is AI-drafted, buyers are filtering by trust signals — brand authority, real voices, podcasts, and verified local presence. This section shows real stats to prove the need for authority."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How does Audio Jones improve discoverability?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We combine personal branding, podcast storytelling, and Answer Engine Optimization (AEO) so your content is recognizable and indexable where decisions actually happen — search, maps, and social."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is Answer Engine Optimization (AEO)?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "AEO is optimizing your content so AI and search assistants can read, structure, and serve your answers directly. We use schema.org markup, local business data, and intent-based messaging to make that possible."
                      }
                    }
                  ]
                }
              ]
            }
          `}
        </Script>
      </body>
    </html>
  );
}
