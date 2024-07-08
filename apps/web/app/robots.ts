import { MetadataRoute } from 'next'
import { baseUrl } from './_const/url'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/post/'],
      disallow: ['/login', '/profile/', '/post/edit/', '/post/new'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
