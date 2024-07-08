import supabase from '@repo/supabase'
import { MetadataRoute } from 'next'
import { baseUrl } from './_const/url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ['/'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    priority: 0.2,
  }))

  const { data: posts } = await supabase.from('post').select('id')

  if (!posts) return routes

  const postRoutes = posts.map(({ id }) => ({
    url: `${baseUrl}/post/${id}`,
    lastModified: new Date(),
    priority: 0.1,
  }))

  return [...routes, ...postRoutes]
}
