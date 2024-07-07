import { getUser } from '@repo/api/auth'
import { useSuspenseQuery } from '@tanstack/react-query'

export const userQueryKey = {
  user: ['user'],
}

export const useUser = () =>
  useSuspenseQuery({
    queryKey: userQueryKey.user,
    queryFn: getUser,
  })
