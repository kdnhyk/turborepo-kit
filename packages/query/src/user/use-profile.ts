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
import { postQueryKey } from '../post'

export const profileQueryKey = {
  profile_by_user_id: (user_id: string) => ['profile', user_id],
  profile_self: ['profile_self'],
}

export const useProfileSelf = () =>
  useSuspenseQuery({
    queryKey: profileQueryKey.profile_self,
    queryFn: async () => {
      const user_id = await getUserId()

      if (!user_id) return null

      return await getProfileByUserId(user_id)
    },
  })

export const useProfileByUserId = (user_id: string) =>
  useSuspenseQuery({
    queryKey: profileQueryKey.profile_by_user_id(user_id),
    queryFn: () => getProfileByUserId(user_id),
  })

export const useProfileMutation = () => {
  const queryClient = useQueryClient()

  const post = useMutation({
    mutationFn: (user: User) =>
      insertProfile({
        user_id: user.id,
        profile_image: null,
        nickname:
          typeof user.user_metadata.name === 'string'
            ? user.user_metadata.name
            : '',
      }),
    onSuccess: (result) => {
      queryClient.setQueryData(profileQueryKey.profile_self, () => result)
    },
  })

  const update = useMutation({
    mutationFn: async (
      profile: Omit<ProfileType, 'profile_image' | 'created_at'> & {
        profile_image: File | string | null
      },
    ) => {
      // Not update profile image
      if (!profile.profile_image || typeof profile.profile_image === 'string') {
        return await updateProfile(profile.user_id, {
          ...profile,
          profile_image: undefined,
        })
      }

      // Update profile image
      await removeProfileImage(profile.user_id)

      const profile_image = await uploadProfileImage(
        profile.profile_image,
        profile.user_id,
        nanoid(),
      )

      return await updateProfile(profile.user_id, {
        ...profile,
        profile_image,
      })
    },
    onSuccess: (result) => {
      queryClient.setQueryData(profileQueryKey.profile_self, () => result)
      queryClient.invalidateQueries({ queryKey: postQueryKey.post_page })
    },
  })

  return { post, update }
}
