import supabase from '@repo/supabase'
import { Metadata } from 'next'

export async function generateStaticParams() {
  const { data: posts } = await supabase.from('post').select('id')

  if (!posts) return []

  return posts.map((post) => ({
    id: post.id.toString(),
  }))
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const { data: post } = await supabase
    .from('post')
    .select(`title, content, image`)
    .eq('id', id)
    .single()

  if (!post) return {}

  return {
    title: `${post.title}`,
    description: `${post.content}`,
    openGraph: {
      images: [post.image || ''],
      title: `${post.title}`,
      description: `${post.content}}`,
    },
  }
}

export default async function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
