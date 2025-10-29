import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ToastProvider } from "@/components/Toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://audiojones.com#org",
                  name: "AJ DIGITAL LLC",
                  url: "https://audiojones.com",
                  brand: { "@id": "https://audiojones.com#business" },
                  logo: { "@type": "ImageObject", "url": "https://audiojones.com/assets/brand/logo.png" },
                  sameAs: [
                    "https://www.facebook.com/audiojones",
                    "https://www.instagram.com/audiojones",
                    "https://www.linkedin.com/company/ajdigitalllc",
                    "https://www.youtube.com/@audiojones"
                  ],
                  contactPoint: [
                    { "@type": "ContactPoint", "contactType": "sales", "email": "contact@audiojones.com", "telephone": "+17866452250", "areaServed": "US", "availableLanguage": ["en","es"] },
                    { "@type": "ContactPoint", "contactType": "customer support", "email": "contact@audiojones.com", "telephone": "+17866452250", "areaServed": "US", "availableLanguage": ["en","es"] }
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://audiojones.com#website",
                  url: "https://audiojones.com",
                  name: "Audio Jones",
                  publisher: { "@id": "https://audiojones.com#org" },
                  "inLanguage": "en",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://audiojones.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "MusicRecordingStudio",
                  "@id": "https://circlehousestudios.com#place",
                  name: "Circle House Studios",
                  url: "https://circlehousestudios.com",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "13700 NW 1st Ave",
                    "addressLocality": "Miami",
                    "addressRegion": "FL",
                    "postalCode": "33168",
                    "addressCountry": "US"
                  },
                  "geo": { "@type": "GeoCoordinates", "latitude": 25.902, "longitude": -80.213 },
                  "hasMap": "https://www.google.com/maps?q=13700+NW+1st+Ave,+Miami,+FL+33168",
                  "sameAs": [
                    "https://www.facebook.com/CircleHouseStudios",
                    "https://www.instagram.com/circlehousestudios"
                  ]
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://audiojones.com#business",
                  name: "Audio Jones",
                  url: "https://audiojones.com",
                  "image": "https://audiojones.com/images/og-image.jpg",
                  "description": "Audio Jones is a Miami-based marketing and automation consultancy operating inside Circle House Studios, offering AI-driven marketing, podcast production, and digital strategy.",
                  "priceRange": "$$",
                  "telephone": "+17866452250",
                  "email": "contact@audiojones.com",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "13700 NW 1st Ave",
                    "addressLocality": "Miami",
                    "addressRegion": "FL",
                    "postalCode": "33168",
                    "addressCountry": "US"
                  },
                  "containedInPlace": { "@id": "https://circlehousestudios.com#place" },
                  "parentOrganization": { "@id": "https://audiojones.com#org" },
                  "openingHoursSpecification": [
                    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "10:00", "closes": "20:00" },
                    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "12:00", "closes": "18:00" }
                  ],
                  "areaServed": [
                    { "@type": "City", "name": "Miami" },
                    { "@type": "City", "name": "Doral" },
                    { "@type": "City", "name": "Fort Lauderdale" },
                    { "@type": "City", "name": "Fort Myers" },
                    { "@type": "Country", "name": "United States" }
                  ],
                  "sameAs": [
                    "https://www.facebook.com/audiojones",
                    "https://www.instagram.com/audiojones",
                    "https://www.linkedin.com/company/ajdigitalllc",
                    "https://www.youtube.com/@audiojones"
                  ],
                  "contactPoint": [
                    { "@type": "ContactPoint", "contactType": "sales", "telephone": "+17866452250", "email": "contact@audiojones.com", "areaServed": "US", "availableLanguage": ["en","es"] },
                    { "@type": "ContactPoint", "contactType": "media inquiries", "telephone": "+17866452250", "email": "contact@audiojones.com", "areaServed": "US", "availableLanguage": ["en"] }
                  ]
                }
              ]
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <ToastProvider>
          <Header />
          <div className="pt-20">
            <div className="mx-auto max-w-[1200px] px-4 md:px-6">
              <Breadcrumbs />
            </div>
            {children}
          </div>
          <Footer />
        </ToastProvider>
        <Script
          src="https://widget.beacon.ai/audiojones?theme=dark"
          strategy="afterInteractive"
          data-beacon-id="audiojones"
        />
      </body>
    </html>
  );
}
