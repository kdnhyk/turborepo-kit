import {
  prefetchPostById,
  prefetchProfileById,
} from '@/utils/supabase/static-prefetch'
import { PostButtons } from '@repo/shared/PostButtons'
import { PostContent } from '@repo/shared/PostContent'
import { getQueryClient } from '@repo/query/get-query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { notFound } from 'next/navigation'

export const revalidate = 0

export default async function PostPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const queryClient = getQueryClient()

  const post = await prefetchPostById(queryClient, Number(id))
  if (!post) notFound()
  await prefetchProfileById(queryClient, post.user_id)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostButtons id={Number(id)} />
      <PostContent post={post} />
    </HydrationBoundary>
  )
}
