import supabase from '@repo/supabase'

export async function generateStaticParams() {
  const { data: posts } = await supabase.from('post').select('id')

  if (!posts) return []

  return posts.map((post) => ({
    id: post.id.toString(),
  }))
}

export default async function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
