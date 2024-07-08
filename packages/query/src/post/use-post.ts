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
import { removePostImage, uploadPostImage } from '@repo/api/storage'
import { nanoid } from 'nanoid/non-secure'
import { getBaseURL } from '../get-base-url'

export const postQueryKey = {
  post_page: ['post_page'],
  post: (id: number) => ['post', id],
  post_view_count: (id: number) => ['post_view_count', id],
}

export const usePostState = () => {
  const queryClient = useQueryClient()

  const refetchPostPage = () =>
    queryClient.refetchQueries({ queryKey: postQueryKey.post_page })
  const refetchPost = () => queryClient.refetchQueries({ queryKey: ['post'] })

  return { refetchPostPage, refetchPost }
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
    queryFn: () => {
      const queryClient = useQueryClient()

      const postPage = queryClient.getQueryData(
        postQueryKey.post_page,
      ) as InfiniteData<{
        result: PostType[]
        currentPage: number
        isLast: boolean
      }> | null

      if (postPage) {
        const post = postPage.pages
          .flatMap((page) => page.result)
          .find((p) => p.id === id)
        console.log('From post page:', post)

        if (post) return post
      }

      return getPostById(id)
    },
  })

export const usePostViewCountById = (id: number) =>
  useSuspenseQuery({
    queryKey: postQueryKey.post_view_count(id),
    queryFn: () =>
      fetch(`${getBaseURL()}/api/redis/get_post_view?id=${id}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => Number(data)),
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
