import { signout } from '@repo/api/auth'
import { useQueryClient } from '@tanstack/react-query'

const useAuth = () => {
  const queryClient = useQueryClient()

  const logout = async () => {
    await signout()
    queryClient.setQueryData(['profile'], () => null)
  }

  return { logout }
}

export { useAuth }
