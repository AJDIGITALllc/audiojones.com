import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Audio Jones | Inside Circle House Studios, Miami FL',
  description: 'Book a consult or studio session with Audio Jones. We’re inside Circle House Studios, 13700 NW 1st Ave, Miami, FL 33168.',
  alternates: {
    canonical: 'https://audiojones.com/contact',
  },
  openGraph: {
    title: 'Contact Audio Jones',
    description: 'Visit us inside Circle House Studios in Miami. Book a consult or session.',
    url: 'https://audiojones.com/contact',
    images: [
      {
        url: 'https://audiojones.com/images/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Audio Jones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[1100px] px-4 md:px-6 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Contact Audio Jones</h1>
      <p className="mt-3 text-base opacity-80">Our office and podcast studio are <strong>inside Circle House Studios</strong> in Miami.</p>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="space-y-2 text-sm leading-relaxed">
          <div className="font-bold">Audio Jones — inside Circle House Studios</div>
          <div>13700 NW 1st Ave<br>Miami, FL 33168</div>
          <div><a className="text-primary hover:underline" href="tel:+17866452250">+1 (786) 645-2250</a></div>
          <div><a className="text-primary hover:underline" href="mailto:contact@audiojones.com">contact@audiojones.com</a></div>
          <div className="pt-2 flex gap-3 items-center">
            <a aria-label="Facebook" target="_blank" rel="me noopener" href="https://www.facebook.com/audiojones">Facebook</a>
            <a aria-label="Instagram" target="_blank" rel="me noopener" href="https://www.instagram.com/audiojones">Instagram</a>
            <a aria-label="LinkedIn" target="_blank" rel="me noopener" href="https://www.linkedin.com/company/ajdigitalllc">LinkedIn</a>
            <a aria-label="YouTube" target="_blank" rel="me noopener" href="https://www.youtube.com/@audiojones">YouTube</a>
          </div>
        </div>

        <div className="text-sm leading-relaxed">
          <div className="font-bold mb-1">Hours</div>
          <ul className="space-y-0.5">
            <li>Mon–Fri: 10:00 AM – 8:00 PM</li>
            <li>Sat: 12:00 PM – 6:00 PM</li>
            <li>Sun: Closed</li>
          </ul>
          <p className="mt-2 text-xs opacity-70">Sessions by appointment only.</p>
        </div>

        <div className="space-y-3">
          <a href="/book" className="inline-flex items-center justify-center rounded-full px-6 py-3 font-bold border border-white/20 hover:border-white/40">Book a Strategy Call</a>
          <a href="mailto:contact@audiojones.com?subject=Project%20Inquiry" className="block underline underline-offset-4">Email your project brief →</a>
          <p className="text-xs opacity-70">Service Areas: Miami-Dade, Broward, Fort Lauderdale, Fort Myers + remote.</p>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-xl aspect-video">
        <iframe title="Map to Circle House Studios" width="100%" height="100%" style={{border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=13700+NW+1st+Ave,+Miami,+FL+33168&output=embed"></iframe>
      </div>
    </section>
  );
}
