import { signout } from '@repo/api/auth'
import { useQueryClient } from '@tanstack/react-query'
import { profileQueryKey, userQueryKey } from '../user'

export const useAuth = () => {
  const queryClient = useQueryClient()

  const logout = async () => {
    await signout()
    queryClient.setQueryData(profileQueryKey.profile_self, () => null)
    queryClient.setQueryData(userQueryKey.user, () => null)
  }

  return { logout }
}
