import { signout } from '@repo/api/auth'
import { useQueryClient } from '@tanstack/react-query'

const useAuth = () => {
  const queryClient = useQueryClient()

  const logout = async () => {
    await signout()
    queryClient.setQueryData(['profile'], () => null)
    queryClient.setQueryData(['user_info'], () => null)
  }

  return { logout }
}

export { useAuth }
