import { PROFILE_SELECTOR } from '@repo/api/user'
import { createClient } from './server-component'
import { QueryClient } from '@tanstack/react-query'
import { profileQueryKey, userQueryKey } from '@repo/query/user'

// RSC Dynamic Rendering

export const getUserId = async () => {
  const supabase = createClient()
  return (await supabase.auth.getSession()).data.session?.user.id
}

export const prefetchUser = async (queryClient: QueryClient) => {
  const supabase = createClient()

  return queryClient.prefetchQuery({
    queryKey: userQueryKey.user,
    queryFn: () =>
      supabase.auth
        .getUser()
        .then((res) => res.data)
        .then((data) => data.user),
  })
}

export const prefetchProfileSelf = async (
  queryClient: QueryClient,
  user_id: string,
) => {
  const supabase = createClient()

  return queryClient.prefetchQuery({
    queryKey: profileQueryKey.profile_self,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile')
        .select(PROFILE_SELECTOR)
        .eq('user_id', user_id)
        .single()

      if (error) {
        throw new Error('Failed to prefetch profile')
      }

      return data
    },
  })
}
