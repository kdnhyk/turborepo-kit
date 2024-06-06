import PostForm from '@/(components)/form/PostForm'
import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: '글 수정',
  description: 'description',
}

export default async function PostEditPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const supabase = createClient()

  const { data: post } = await supabase
    .from('post')
    .select('id, user_id, title, content')
    .eq('id', id)
    .limit(1)
    .single()

  if (!post) {
    notFound()
  }

  const { title, content } = post

  return (
    <>
      <PostForm
        defaultValues={{
          id: Number(id),
          title,
          content: content || '',
        }}
      />
    </>
  )
}
