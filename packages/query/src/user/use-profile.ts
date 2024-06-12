import {
  ProfileType,
  getProfileByUserId,
  insertProfile,
  updateProfile,
} from '@repo/api/user'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { getUserId } from '@repo/api/auth'
import { removeProfileImage, uploadProfileImage } from '@repo/api/storage'
import { nanoid } from 'nanoid/non-secure'
import { User } from '@supabase/supabase-js'

export const useProfileSelf = () =>
  useSuspenseQuery({
    queryKey: ['profile_self'],
    queryFn: async () => {
      const user_id = await getUserId()

      if (!user_id) return null

      return await getProfileByUserId(user_id)
    },
  })

export const useProfile = (user_id: string) =>
  useSuspenseQuery({
    queryKey: ['profile', user_id],
    queryFn: () => getProfileByUserId(user_id),
  })

export const useProfileMutation = () => {
  const queryClient = useQueryClient()

  const post = useMutation({
    mutationFn: (user: User) =>
      insertProfile({
        user_id: user.id,
        profile_image: null,
        nickname: user.user_metadata.name,
      }),
    onSuccess: (result) => {
      queryClient.setQueryData(['profile_self'], () => result)
    },
  })

  const update = useMutation({
    mutationFn: async (
      profile: Omit<ProfileType, 'profile_image'> & {
        profile_image: File | string | null
      },
    ) => {
      if (typeof profile.profile_image === 'string') {
        return await updateProfile(profile.user_id, {
          ...profile,
          profile_image: undefined,
        })
      }

      await removeProfileImage(profile.user_id)

      if (profile.profile_image === null) {
        return await updateProfile(profile.user_id, {
          ...profile,
          profile_image: null,
        })
      }

      const path = await uploadProfileImage(
        profile.profile_image,
        profile.user_id,
        nanoid(),
      )

      return await updateProfile(profile.user_id, {
        ...profile,
        profile_image: path,
      })
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['profile_self'], () => result)
      queryClient.invalidateQueries({ queryKey: ['post_page'] })
    },
  })

  return { post, update }
}

