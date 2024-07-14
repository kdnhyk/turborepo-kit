'use client'

import { PostButtons } from '@repo/shared/PostButtons'
import { PostContent } from '@repo/shared/PostContent'
import { PostLog } from '@repo/shared/PostLog'
import { usePostById } from '@repo/query/post'
import { redirect, useSearchParams } from 'next/navigation'

export default function PostPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  if (!id) redirect('/')
  const { data: post } = usePostById(Number(id))
  if (!post) redirect('/')

  return (
    <>
      <PostButtons post={post} />
      <PostContent post={post} />
      <PostLog type="post_view_count" id={id} />
    </>
  )
}
