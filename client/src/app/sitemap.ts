import type { MetadataRoute } from 'next';

/**
 * Page Craft — Dynamic Sitemap Generator
 * Generates a comprehensive sitemap for search engine indexing
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.thepagecraft.com';

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/publishing-plans',
    '/publishing-process',
    '/self-publishing',
    '/bookstore',
    '/blog',
    '/faq',
    '/careers',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/refund-policy',
    '/shipping-policy',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1.0 : path.includes('book') ? 0.9 : 0.8,
  }));

  // In production, dynamically fetch book and blog slugs from API
  // For now, return static pages
  return staticEntries;
}
