'use client'

import { PostForm } from '@repo/shared/PostForm'
import { usePostById } from '@repo/query/post'
import { redirect, useSearchParams } from 'next/navigation'

export default function PostEditPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { data: post } = usePostById(Number(id))
  if (!post) redirect('/')

  return (
    <>
      <PostForm post={post} />
    </>
  )
}
