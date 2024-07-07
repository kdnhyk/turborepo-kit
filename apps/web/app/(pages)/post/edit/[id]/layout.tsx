import supabase from '@repo/supabase'
import { Metadata } from 'next'

export async function generateStaticParams() {
  const { data: posts } = await supabase.from('post').select('id')

  if (!posts) return []

  return posts.map((post) => ({
    id: post.id.toString(),
  }))
}

export const metadata: Metadata = {
  title: 'Edit Post',
}

export default async function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return <>{children}</>
}
