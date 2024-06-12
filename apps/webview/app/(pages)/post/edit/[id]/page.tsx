import Header from '@/(components)/common/Header'
import PostForm from '@/(components)/form/PostForm'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

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
      <Header title="Post Edit" />
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
