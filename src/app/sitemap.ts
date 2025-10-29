import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = 'https://audiojones.com';
  // Add/replace with dynamic page discovery if you have a CMS.
  const routes = [
    '',
    '/services',
    '/about',
    '/portfolio',
    '/blog',
    '/contact'
  ];

  const now = new Date().toISOString();

  return routes.map((path) => ({
    url: `${site}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : 0.8
  }));
}
