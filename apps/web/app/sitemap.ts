import supabase from '@repo/supabase'
import { MetadataRoute } from 'next'

const URL = 'https://turborepo-kit.01.works'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [''].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
    priority: 0.2,
  }))

  const { data: posts } = await supabase.from('post').select('id')

  if (!posts) return routes

  const postRoutes = posts.map(({ id }) => ({
    url: `${URL}/post/${id}`,
    lastModified: new Date(),
    priority: 0.1,
  }))

  return [...routes, ...postRoutes]
}
