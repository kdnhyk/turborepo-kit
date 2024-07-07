'use client'

import { PostForm } from '@repo/shared/PostForm'
import { notFound } from 'next/navigation'
import { usePostById } from '@repo/query/post'

export default function PostEditPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const { data: post } = usePostById(Number(id))
  if (!post) notFound()

  return (
    <>
      <PostForm post={post} />
    </>
  )
}
