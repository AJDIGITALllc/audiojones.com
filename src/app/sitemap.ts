import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://audiojones.com';

  const staticRoutes = [
    '/',
    '/book',
    '/cancellation-policy',
    '/consent-testimonial',
    '/cookie-policy',
    '/not-authorized',
    '/privacy-policy',
    '/services',
    '/studio-policy',
    '/terms-of-service',
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [
    ...staticUrls
  ];
}
