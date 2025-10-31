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
        <Script
          id="howto-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://audiojones.com/#org",
                  "name": "Audio Jones",
                  "url": "https://audiojones.com",
                  "logo": "https://audiojones.com/logo.png",
                  "sameAs": [],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+1-786-645-2250",
                    "contactType": "Customer Service",
                    "email": "contact@audiojones.com"
                  }
                },
                {
                  "@type": "HowTo",
                  "name": "How to turn one podcast recording into a full month of content",
                  "description": "Audio Jones' 3-step system to launch, repurpose, and automate content for Miami-based entrepreneurs.",
                  "provider": {
                    "@id": "https://audiojones.com/#org"
                  },
                  "step": [
                    {
                      "@type": "HowToStep",
                      "name": "Launch your podcast",
                      "text": "Record a high-quality video podcast episode with a clear strategy for your South Florida audience.",
                      "url": "https://audiojones.com/services/podcast"
                    },
                    {
                      "@type": "HowToStep",
                      "name": "Repurpose content",
                      "text": "Break the episode into clips, quotes, and articles for multi-platform publishing.",
                      "url": "https://audiojones.com/services/personal-branding"
                    },
                    {
                      "@type": "HowToStep",
                      "name": "Automate and scale",
                      "text": "Use AI marketing systems to schedule, distribute, and capture leads automatically.",
                      "url": "https://audiojones.com/services/ai-marketing"
                    }
                  ],
                  "tool": [
                    "Video podcast setup",
                    "Content repurposing templates",
                    "AI marketing automations"
                  ],
                  "totalTime": "P1D",
                  "estimatedCost": {
                    "@type": "MonetaryAmount",
                    "currency": "USD",
                    "value": "0"
                  }
                }
              ]
            }),
          }}
        />
      </body>
    </html>
  );
}
