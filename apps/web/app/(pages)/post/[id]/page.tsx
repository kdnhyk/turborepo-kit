import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server-component'
import supabase from '@repo/supabase'
import PostBottoms from '@/(components)/common/PostButtons'
import { formmatedDate } from '@repo/utils/date'

export const revalidate = 60 

export async function generateStaticParams() {
  const { data: posts } = await supabase.from('post').select('id')

  if (!posts) return []

  return posts.map(({ id }) => ({
    id: id.toString(),
  }))
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const { data: post } = await supabase
    .from('post')
    .select('title, content')
    .eq('id', id)
    .single()

  if (!post) return {}

  return {
    title: post.title,
    description: post.content,
  }
}

export default async function PostPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const supabase = createClient()

  const { data: post } = await supabase
    .from('post')
    .select('id, user_id, created_at, title, content')
    .eq('id', id)
    .limit(1)
    .single()

  if (!post) {
    notFound()
  }

  const { user_id, created_at, title, content } = post

  return (
    <>
      <div className="flex flex-1 flex-col divide-y">
        <div className="flex justify-between p-3">
          <h2 className="text-xl font-bold">{title}</h2>
          <PostBottoms id={id} userId={user_id} />
        </div>
        <p className="flex-1 p-3">{content}</p>
        <p className="p-3 text-end text-zinc-700">
          {formmatedDate(created_at)}
        </p>
      </div>
    </>
  )
}
