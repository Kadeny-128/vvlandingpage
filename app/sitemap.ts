import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.victoryvelocity.ca',
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
