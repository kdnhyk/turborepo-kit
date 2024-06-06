import PostMenu from '@/(components)/common/PostMenu'
import PostPageList from '@/(components)/list/PostPageList'
import { POST_SELECTOR } from '@repo/api/post'
import supabase from '@repo/supabase'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default async function HomePage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
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

      return { result: data, currentPage: pageParam, isLast }
    },
    initialPageParam: 0,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostMenu />
      <ul className="flex flex-1 flex-col divide-y">
        <PostPageList />
      </ul>
    </HydrationBoundary>
  )
}
