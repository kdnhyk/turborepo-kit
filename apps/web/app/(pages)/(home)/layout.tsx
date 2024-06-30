import PostMenu from '@/(components)/common/PostMenu'
import { createClient } from '@/utils/supabase/server-component'
import { POST_SELECTOR } from '@repo/api/post'
import { getQueryClient } from '@repo/query/get-query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export const revalidate = 60

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const queryClient = getQueryClient()

  queryClient.prefetchInfiniteQuery({
    queryKey: ['post_page'],
    queryFn: async ({ pageParam }) => {
      let isLast = false
      const { data, error } = await supabase
        .from('post')
        .select(POST_SELECTOR)
        .range(0, 11)
        .order('created_at', { ascending: false })

      if (error) {
        console.log(error)
      }

      if (!data || data.length < 12) {
        isLast = true
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      return { result: data, currentPage: pageParam, isLast }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _pages) => {
      if (!lastPage.isLast) return lastPage.currentPage + 1

      return undefined
    },
    pages: 3,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostMenu />
      {children}
    </HydrationBoundary>
  )
}
