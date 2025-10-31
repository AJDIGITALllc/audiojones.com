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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "author": {
        "@type": "Organization",
        "name": "AJ DIGITAL LLC"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AJ DIGITAL LLC",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.audiojones.com/images/logo.png"
        }
      },
      "headline": "Local founder turned 1 show into a weekly authority channel.",
      "url": "https://www.audiojones.com/insights/case-studio-weekly-authority",
      "mainEntityOfPage": "https://www.audiojones.com/insights/case-studio-weekly-authority",
      "articleBody": "Recorded at Circle House Studios. Branded video podcast assets in 48 hrs. Repurposed for YouTube + IG Reels."
    },
    {
      "@type": "Article",
      "author": {
        "@type": "Organization",
        "name": "AJ DIGITAL LLC"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AJ DIGITAL LLC",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.audiojones.com/images/logo.png"
        }
      },
      "headline": "Creator collective scaled content without burning out.",
      "url": "https://www.audiojones.com/insights/case-content-engine",
      "mainEntityOfPage": "https://www.audiojones.com/insights/case-content-engine",
      "articleBody": "1 → many repurposing workflow. Monthly strategy + analytics. Social captions auto-generated."
    },
    {
      "@type": "Article",
      "author": {
        "@type": "Organization",
        "name": "AJ DIGITAL LLC"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AJ DIGITAL LLC",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.audiojones.com/images/logo.png"
        }
      },
      "headline": "Consultant automated follow-ups and bookings.",
      "url": "https://www.audiojones.com/insights/case-ai-automation",
      "mainEntityOfPage": "https://www.audiojones.com/insights/case-ai-automation",
      "articleBody": "AI-powered nurture + booking. GBP + local visibility tuned. Reporting sent to founder."
    }
  ]
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
        {/*
          This script adds Article schema for the case studies.
          If a root Organization or LocalBusiness schema is added later,
          this @graph should be merged with it.
        */}
        <Script
          id="json-ld-case-studies"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}