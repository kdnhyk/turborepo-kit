import {
  ProfileType,
  getProfileByUserId,
  postProfile,
  updateProfile,
} from '@repo/api/user'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { getUser, getUserId } from '@repo/api/auth'
import { deleteProfileImage, postProfileImage } from '@repo/api/storage'
import { nanoid } from 'nanoid'

const useProfile = () =>
  useSuspenseQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const user_id = await getUserId()

      if (!user_id) return null

      return await getProfileByUserId(user_id)
    },
  })

const useProfileMutation = () => {
  const queryClient = useQueryClient()

  const post = useMutation({
    mutationFn: async () => {
      const user = await getUser()

      if (!user) return null

      return await postProfile({
        user_id: user.id,
        profile_image: null,
        nickname: user.user_metadata.name,
      })
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['profile'], () => result)
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

      await deleteProfileImage(profile.user_id)

      if (profile.profile_image === null) {
        return await updateProfile(profile.user_id, {
          ...profile,
          profile_image: null,
        })
      }

      const path = await postProfileImage(
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
      queryClient.setQueryData(['profile'], () => result)
    },
  })

  return { post, update }
}

export { useProfile, useProfileMutation }
