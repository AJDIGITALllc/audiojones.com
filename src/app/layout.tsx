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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://audiojones.com/#org",
      "name": "AJ DIGITAL LLC",
      "alternateName": "Audio Jones",
      "url": "https://audiojones.com/",
      "logo": "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIOJONES_HERO_IMAGE_03.svg?updatedAt=1761600307013",
      "email": "contact@audiojones.com",
      "telephone": "+1-786-645-2250",
      "sameAs": [
        "https://www.instagram.com/audiojones",
        "https://www.youtube.com/@audiojones",
        "https://www.linkedin.com/in/tyrone-nelms"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://audiojones.com/#founder",
      "name": "Tyrone Alexander Nelms",
      "alternateName": "Audio Jones",
      "jobTitle": "AI Marketing Consultant",
      "worksFor": {
        "@id": "https://audiojones.com/#org"
      },
      "image": "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIOJONES_HERO_IMAGE_03.svg?updatedAt=1761600307013",
      "email": "contact@audiojones.com",
      "telephone": "+1-786-645-2250",
      "url": "https://audiojones.com/"
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://audiojones.com/#studio",
      "name": "Audio Jones Studio + AI Consulting",
      "image": "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIOJONES_HERO_IMAGE_03.svg?updatedAt=1761600307013",
      "url": "https://audiojones.com/",
      "priceRange": "$$",
      "telephone": "+1-786-645-2250",
      "email": "contact@audiojones.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13700 NW 1st Ave",
        "addressLocality": "Miami",
        "addressRegion": "FL",
        "postalCode": "33168",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.902,
        "longitude": -80.209
      },
      "areaServed": [
        "Miami, FL",
        "Fort Lauderdale, FL",
        "Palm Beach, FL",
        "South Florida"
      ],
      "knowsAbout": [
        "AI marketing automation",
        "Podcast production",
        "Local SEO and AEO",
        "Google Business Profile optimization",
        "Personal brand consulting"
      ],
      "parentOrganization": {
        "@id": "https://audiojones.com/#org"
      }
    },
    {
      "@type": "Service",
      "@id": "https://audiojones.com/#services",
      "name": "AI Marketing, Podcast Production, and AEO Consulting",
      "provider": {
        "@id": "https://audiojones.com/#org"
      },
      "serviceType": [
        "AI marketing automation",
        "Podcast + video production",
        "Local SEO / AEO",
        "Brand and offer development",
        "Marketing systems for creators"
      ],
      "areaServed": "US-FL"
    },
    {
      "@type": "WebSite",
      "@id": "https://audiojones.com/#website",
      "url": "https://audiojones.com/",
      "name": "Audio Jones",
      "publisher": {
        "@id": "https://audiojones.com/#org"
      },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://audiojones.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://audiojones.com/#studio-gbp",
      "name": "Audio Jones Studio + AI Consulting",
      "description": "AI marketing, podcast production, and automation consulting for South Florida creators and businesses.",
      "url": "https://audiojones.com/",
      "image": "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIOJONES_HERO_IMAGE_03.svg?updatedAt=1761600307013",
      "telephone": "+1-786-645-2250",
      "email": "contact@audiojones.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13700 NW 1st Ave",
        "addressLocality": "Miami",
        "addressRegion": "FL",
        "postalCode": "33168",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 25.902,
        "longitude": -80.209
      },
      "hasMap": "https://www.google.com/maps/search/?api=1&query=13700+NW+1st+Ave,+Miami,+FL+33168",
      "areaServed": [
        {
          "@type": "AdministrativeArea",
          "name": "Miami, FL"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Fort Lauderdale, FL"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Palm Beach, FL"
        },
        {
          "@type": "AdministrativeArea",
          "name": "South Florida"
        }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "10:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Saturday"
          ],
          "opens": "11:00",
          "closes": "16:00"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/audiojones",
        "https://www.youtube.com/@audiojones",
        "https://www.linkedin.com/in/tyrone-nelms"
      ],
      "potentialAction": [
        {
          "@type": "ReserveAction",
          "name": "Book a Call",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://audiojones.com/book",
            "inLanguage": "en-US",
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          }
        },
        {
          "@type": "ContactAction",
          "name": "Email Audio Jones",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "mailto:contact@audiojones.com"
          }
        },
        {
          "@type": "CallAction",
          "name": "Call Audio Jones Studio",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "tel:+17866452250"
          }
        },
        {
          "@type": "ViewAction",
          "name": "Get Directions",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.google.com/maps/search/?api=1&query=13700+NW+1st+Ave,+Miami,+FL+33168"
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "Audio Jones | Miami AI Marketing Consultant & Podcast Studio",
  description: "Audio Jones helps South Florida entrepreneurs amplify their brand through AI marketing, podcast production, and automation — based at Circle House Studios, 13700 NW 1st Ave, Miami, FL 33168.",
  keywords: "Miami AI marketing, podcast production Miami, local SEO consultant, automation agency Florida, Audio Jones, AJ Digital LLC, Tyrone Nelms, Circle House Studios Miami",
  authors: [{ name: "Tyrone Alexander Nelms" }],
  robots: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
  openGraph: {
    title: "Audio Jones | Miami AI Marketing Consultant & Podcast Studio",
    description: "Build authority, automate growth, and amplify your voice from our Miami studio — Audio Jones helps creators and businesses thrive with AI-driven marketing and podcast production.",
    url: "https://audiojones.com/",
    type: "website",
    images: "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIOJONES_HERO_IMAGE_03.svg?updatedAt=1761600307013",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Jones | Miami AI Marketing Consultant & Podcast Studio",
    description: "South Florida AI marketing, podcast production, and automation studio — led by Audio Jones.",
    creator: "@audiojones",
    site: "@audiojones",
    images: "https://ik.imagekit.io/audiojones/AUDIOJONES.COM/assets/AUDIOJONES_HERO_IMAGE_03.svg?updatedAt=1761600307013",
  },
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
  other: {
    "application/ld+json": JSON.stringify(jsonLd),
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
      </body>
    </html>
  );
}
