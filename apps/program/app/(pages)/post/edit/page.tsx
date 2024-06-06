'use client'

import PostForm from '@/(components)/form/PostForm'
import { usePost } from '@repo/query/post'
import { notFound, useSearchParams } from 'next/navigation'

export default function PostEditPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { data: post } = usePost(Number(id))

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
