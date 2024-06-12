import {
  InfiniteData,
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'
import {
  PostType,
  getPostById,
  getPostPage,
  insertPost,
  removePost,
  updatePost,
} from '@repo/api/post'

export const usePostPage = () =>
  useSuspenseInfiniteQuery({
    queryKey: ['post_page'],
    queryFn: async ({ pageParam }) => {
      let isLast = false
      const data = await getPostPage(pageParam)

      if (!data || data.length < 12) {
        isLast = true
      }

      return { result: data, currentPage: pageParam, isLast }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _pages) => {
      if (!lastPage.isLast) return lastPage.currentPage + 1

      return undefined
    },
  })

export const usePost = (id: number) =>
  useSuspenseQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id),
    initialData: () => {
      const queryClient = useQueryClient()

      const prev = queryClient.getQueryData(['post_page']) as
        | InfiniteData<{
            result: PostType[]
            currentPage: number
            isLast: boolean
          }>
        | undefined

      const post = prev?.pages
        .flatMap((page) => page.result)
        .find((post) => post.id === id)

      return post
    },
  })

export const usePostMutation = () => {
  const queryClient = useQueryClient()

  const post = useMutation({
    mutationFn: insertPost,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['post_page'] })
      queryClient.setQueryData(['post', result.id], () => result)
    },
  })

  const update = useMutation({
    mutationFn: updatePost,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['post_page'] })
      queryClient.setQueryData(['post', result.id], () => result)
    },
  })

  const remove = useMutation({
    mutationFn: removePost,
    onSuccess: (_result, variable) => {
      queryClient.invalidateQueries({ queryKey: ['post_page'] })
      queryClient.setQueryData(['post', variable], () => null)
    },
  })

  return { post, update, remove }
}
