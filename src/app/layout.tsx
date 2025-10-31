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
        <Script id="json-ld-faq" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "How do I fix my content bottleneck?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Our 3-Step System helps fix your content bottleneck. First, we establish a Studio Workflow to record high-quality podcast and video content efficiently. Second, we repurpose that single recording into weeks of social media content like shorts and carousels. Third, we implement AI Systems to automate scheduling, distribution, and follow-up, ensuring consistency without relying on you."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How do you turn a podcast into repurposed clips?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We take your long-form podcast recording and identify the most impactful moments, which are then edited into short-form video clips, audiograms, and quote graphics. These are optimized for platforms like Instagram Reels, TikTok, and YouTube Shorts to maximize reach and engagement."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How can I use AI for content consistency?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "AI can be used to schedule posts across multiple platforms, generate transcripts, write show notes, and create email newsletters from your core content. This automates the distribution process, helping you maintain a consistent publishing schedule without the manual effort."
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
