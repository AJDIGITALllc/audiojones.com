import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const site = 'https://audiojones.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/private', '/drafts']
      }
    ],
    sitemap: `${site}/sitemap.xml`,
    host: site
  };
}
