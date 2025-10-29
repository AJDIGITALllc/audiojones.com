import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Audio Jones',
  description: 'AI Automation, Local SEO, Branding, Content, and GBP Optimization services.',
  alternates: {
    canonical: 'https://audiojones.com/services',
  },
  openGraph: {
    title: 'Services | Audio Jones',
    description: 'AI Automation, Local SEO, Branding, Content, and GBP Optimization services.',
    url: 'https://audiojones.com/services',
    images: [
      {
        url: 'https://audiojones.com/images/services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Services | Audio Jones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function ServicesPage() {
  const services = [
    {
      name: 'AI Automation',
      serviceType: 'AI Automation',
      url: '/services/ai-automation',
    },
    {
      name: 'Local SEO',
      serviceType: 'Local SEO',
      url: '/services/local-seo',
    },
    {
      name: 'Branding',
      serviceType: 'Branding',
      url: '/services/branding',
    },
    {
      name: 'Content Creation',
      serviceType: 'Content Creation',
      url: '/services/content-creation',
    },
    {
      name: 'GBP Optimization',
      serviceType: 'Google Business Profile Optimization',
      url: '/services/gbp-optimization',
    },
  ];

  return (
    <>
      {services.map((service) => (
        <script
          key={service.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: service.name,
              serviceType: service.serviceType,
              provider: {
                '@type': 'Organization',
                name: 'Audio Jones',
                url': 'https://audiojones.com',
              },
              areaServed: ['Miami', 'Doral', 'Fort Lauderdale', 'Fort Myers'],
              url: `https://audiojones.com${service.url}`,
              brand: {
                '@type': 'Brand',
                name: 'Audio Jones',
              },
            }),
          }}
        />
      ))}
      <main className="min-h-screen bg-[#111] text-white">
        <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Services</h1>
          <p className="mt-3 text-base opacity-80">Cards for AI Automation, Local SEO, Branding, Content, GBP Optimization.</p>
        </section>
      </main>
    </>
  );
}
