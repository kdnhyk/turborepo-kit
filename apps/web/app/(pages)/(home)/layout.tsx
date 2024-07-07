import { getQueryClient } from '@repo/query/get-query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { prefetchPostPage } from '@/utils/supabase/static-prefetch'

export const revalidate = 0

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = getQueryClient()
  await prefetchPostPage(queryClient)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}
