'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Breadcrumb = {
  label: string;
  href: string;
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter((part) => part);

  const breadcrumbs: Breadcrumb[] = [
    { label: 'Home', href: '/' },
    ...pathParts.map((part, index) => {
      const href = `/${pathParts.slice(0, index + 1).join('/')}`;
      const label = part.charAt(0).toUpperCase() + part.slice(1);
      return { label, href };
    }),
  ];

  const itemListElement = breadcrumbs.map((breadcrumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: breadcrumb.label,
    item: `https://audiojones.com${breadcrumb.href}`,
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/70">
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={breadcrumb.href}>
            <Link href={breadcrumb.href} className="hover:underline">
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 && ' / '}
          </span>
        ))}
      </nav>
    </>
  );
}
