import { getQueryClient } from '@repo/query/get-query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { prefetchPostPage } from '@/utils/supabase/static-prefetch'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nogwon',
  description: 'Dear my green',
}

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
