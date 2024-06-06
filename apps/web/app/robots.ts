import { MetadataRoute } from 'next'

const URL = 'https://turborepo-kit.01.works'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/post/'],
      disallow: ['/login', '/profile/'],
    },
    sitemap: `${URL}/sitemap.xml`,
  }
}
