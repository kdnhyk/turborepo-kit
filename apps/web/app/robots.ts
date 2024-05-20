import { MetadataRoute } from 'next'

const URL = 'https://01.works'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: `${URL}/sitemap.xml`,
  }
}
