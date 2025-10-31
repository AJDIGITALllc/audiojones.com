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
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "name": "Audio Jones at Circle House Studios",
                  "image": "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/audio-jones-hero.webp?updatedAt=1761600049033",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "13700 NW 1st Ave",
                    "addressLocality": "Miami",
                    "addressRegion": "FL",
                    "postalCode": "33168",
                    "addressCountry": "US"
                  },
                  "description": "Audio Jones operates out of the iconic Circle House, a production hub for creators in South Florida offering on-site recording services for personal branding, podcast production, and AI marketing.",
                  "telephone": "+1-786-645-2250",
                  "openingHours": "Mo-Fr 09:00-18:00"
                },
                {
                  "@context": "https://schema.org",
                  "@type": "ImageGallery",
                  "name": "Audio Jones Studio Gallery at Circle House",
                  "image": [
                    "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/gallery/podcast-suite.webp",
                    "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/gallery/control-room.webp",
                    "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/gallery/lounge.webp",
                    "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/gallery/vocal-booth.webp",
                    "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/gallery/creative-lab.webp",
                    "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/gallery/exterior.webp"
                  ]
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
