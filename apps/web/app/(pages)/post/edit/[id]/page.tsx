import { prefetchPostById } from '@/utils/supabase/static-prefetch'
import { PostForm } from '@repo/shared/PostForm'
import { getQueryClient } from '@repo/query/get-query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

export const revalidate = 0

export default async function PostEditPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const queryClient = getQueryClient()
  const post = await prefetchPostById(queryClient, Number(id))

  if (!post) notFound()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostForm post={post} />
    </HydrationBoundary>
  )
}
