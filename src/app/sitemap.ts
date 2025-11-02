// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.audiojones.com',
      lastModified: new Date(),
    },
    {
      url: 'https://www.audiojones.com/book',
      lastModified: new Date(),
    },
    {
      url: 'https://www.audiojones.com/cancellation-policy',
      lastModified: new Date(),
    },
    {
      url: 'https://www.audiojones.com/consent-testimonial',
      lastModified: new Date(),
    },
    {
      url: 'https://www.audiojones.com/cookie-policy',
      lastModified: new Date(),
    },
    {
      url: 'https://www.audiojones.com/privacy-policy',
      lastModified: new Date(),
    },
    {
      url: 'https://www.audiojones.com/services',
      lastModified: new Date(),
    },
    {
      url: 'https://www.audiojones.com/studio-policy',
      lastModified: new Date(),
    },
    {
      url: 'https://www.audiojones.com/terms-of-service',
      lastModified: new Date(),
    },
  ];
}
