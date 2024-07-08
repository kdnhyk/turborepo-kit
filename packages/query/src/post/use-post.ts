import {
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
import { removePostImage, uploadPostImage } from '@repo/api/storage'
import { nanoid } from 'nanoid/non-secure'

export const postQueryKey = {
  post: (id: number) => ['post', id],
  post_page: ['post_page'],
}

export const usePostPage = () =>
  useSuspenseInfiniteQuery({
    queryKey: postQueryKey.post_page,
    queryFn: async ({ pageParam }) => {
      let isLast = false
      const data = await getPostPage(pageParam)

      if (!data || data.length < 12) {
        isLast = true
      }

      return { result: data || [], currentPage: pageParam, isLast }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _pages) => {
      if (!lastPage.isLast) return lastPage.currentPage + 1

      return undefined
    },
    select: (data) => data.pages.flatMap((page) => page.result),
  })

export const usePostById = (id: number) =>
  useSuspenseQuery({
    queryKey: postQueryKey.post(id),
    queryFn: () => getPostById(id),
  })

export const usePostMutation = () => {
  const queryClient = useQueryClient()

  const insert = useMutation({
    mutationFn: async (
      post: Omit<PostType, 'created_at' | 'id' | 'image'> & {
        image?: File | null
      },
    ) => {
      const { image: img, ...data } = post
      // Not update post image
      const { id } = await insertPost({ ...data, image: null })

      let image: string | undefined = undefined
      if (img) {
        image = await uploadPostImage(img, post.user_id, id, nanoid())
      }

      return await updatePost({
        id,
        image,
      })
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: postQueryKey.post_page })
      queryClient.setQueryData(postQueryKey.post(result.id), () => result)
    },
  })

  const update = useMutation({
    mutationFn: async (
      post: { id: number; user_id: string } & Partial<
        Omit<PostType, 'image'> & { image?: File | string | null }
      >,
    ) => {
      // Not update post image
      if (!post.image || typeof post.image === 'string') {
        return await updatePost({ ...post, image: undefined })
      }

      // Update post image
      await removePostImage(post.user_id, post.id)

      const image = await uploadPostImage(
        post.image,
        post.user_id,
        post.id,
        nanoid(),
      )

      return await updatePost({
        ...post,
        image,
      })
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: postQueryKey.post_page })
      queryClient.setQueryData(postQueryKey.post(result.id), () => result)
    },
  })

  const remove = useMutation({
    mutationFn: async (post: Pick<PostType, 'id' | 'user_id'>) => {
      await removePostImage(post.user_id, post.id)
      await removePost(post.id)
    },
    onSuccess: (_result, variable) => {
      queryClient.invalidateQueries({ queryKey: postQueryKey.post_page })
      queryClient.setQueryData(postQueryKey.post(variable.id), () => null)
    },
  })

  return { insert, update, remove }
}
