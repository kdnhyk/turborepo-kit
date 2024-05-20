import { MetadataRoute } from 'next'

const URL = 'https://01.works'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ['', '/posts'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes]
}
