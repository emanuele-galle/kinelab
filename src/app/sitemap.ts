import { MetadataRoute } from 'next'
import { getServices } from '@/lib/payload'

// Service slugs fallback
const defaultServiceSlugs = ['pilates', 'functional', 'personal']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kinelab.fodivps2.cloud'
  const lastModified = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/prenota`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servizi`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Service pages - try from CMS, fallback to defaults
  let serviceSlugs: string[]
  try {
    const services = await getServices()
    serviceSlugs = services.length > 0 ? services.map(s => s.slug) : defaultServiceSlugs
  } catch {
    serviceSlugs = defaultServiceSlugs
  }

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map(slug => ({
    url: `${baseUrl}/servizi/${slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages]
}
