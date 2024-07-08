import { QueryClient } from '@tanstack/react-query'
import { getPlaiceholder } from 'plaiceholder'
import { getStoragePath } from '@repo/utils/supabase'
import { getPostById, getPostPage } from '@repo/api/post'
import { profileQueryKey } from '@repo/query/user'
import { getProfileByUserId } from '@repo/api/user'
import { postQueryKey } from '@repo/query/post'
import { getPostViewCount } from '@repo/api/redis'

// RSC Static Rendering

const getPlaiceholderImage = async (bucket: string, src: string) => {
  const buffer = await fetch(getStoragePath(`${bucket}/${src}`, 40)).then(
    async (res) => Buffer.from(await res.arrayBuffer()),
  )

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 })

  return {
    ...plaiceholder,
    img: { src, height, width },
  }
}

export const prefetchProfileById = (
  queryClient: QueryClient,
  user_id: string,
) => {
  queryClient.prefetchQuery({
    queryKey: profileQueryKey.profile_by_user_id(user_id),
    queryFn: () => getProfileByUserId(user_id),
  })
}

export const prefetchPostById = (queryClient: QueryClient, id: number) =>
  queryClient.fetchQuery({
    queryKey: postQueryKey.post(id),
    queryFn: () => getPostById(id),
  })

export const prefetchPostPage = (queryClient: QueryClient) =>
  queryClient.prefetchInfiniteQuery({
    queryKey: postQueryKey.post_page,
    queryFn: async ({ pageParam }) => {
      let isLast = false
      const res = await getPostPage(pageParam)

      if (!res || res.length < 12) {
        isLast = true
      }

      // const result = res
      //   ? await Promise.all(
      //       res.map(async (product) => {
      //         const placeholder = product.images
      //           ? await Promise.all(
      //               product.images.map((img) =>
      //                 getPlaiceholderImage('product', img),
      //               ),
      //             )
      //           : undefined

      //         return {
      //           ...product,
      //           placeholder: placeholder?.map((el) => el.base64),
      //         }
      //       }),
      //     )
      //   : []

      return {
        result: res || [],
        currentPage: pageParam,
        isLast,
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return lastPage.currentPage + 1

      return undefined
    },
    pages: 3,
  })

export const prefetchPostViewCount = async (
  queryClient: QueryClient,
  id: number,
) =>
  queryClient.prefetchQuery({
    queryKey: postQueryKey.post_view_count(id),
    queryFn: () => getPostViewCount(id.toString()),
  })
