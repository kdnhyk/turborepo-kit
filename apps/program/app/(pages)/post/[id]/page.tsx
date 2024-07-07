'use client'

import { PostButtons } from '@repo/shared/PostButtons'
import { PostContent } from '@repo/shared/PostContent'
import { notFound } from 'next/navigation'
import { usePostById } from '@repo/query/post'

export default function PostPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const { data: post } = usePostById(Number(id))
  if (!post) return notFound()

  return (
    <>
      <PostButtons post={post} />
      <PostContent post={post} />
    </>
  )
}
