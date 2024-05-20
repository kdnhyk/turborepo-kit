import { ProfileType } from '@repo/types/profile'
import { getProfile } from '@repo/api/user'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

const useProfile = () => {
  const queryClient = useQueryClient()

  const profile = useSuspenseQuery<ProfileType | null | undefined>({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
  })

  const resetProfile = () => queryClient.setQueryData(['profile'], () => null)

  return { profile, resetProfile }
}

export { useProfile }
