import Header from '@/(components)/common/Header'
import AuthProvider from '@/providers/auth-provider'
import { createClient } from '@/utils/supabase/server-component'
import { PROFILE_SELECTOR } from '@repo/api/user'
import { QueryProvider } from '@repo/query/provider'
import { getQueryClient } from '@repo/query/get-query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const queryClient = getQueryClient()
  const supabase = createClient()

  const userId = (await supabase.auth.getSession()).data.session?.user.id

  if (userId) {
    queryClient.prefetchQuery({
      queryKey: ['profile_self'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('profile')
          .select(PROFILE_SELECTOR)
          .eq('user_id', userId)
          .single()

        if (error) {
          throw new Error('프로필 정보를 가져오는데 실패했습니다')
        }

        return data
      },
    })
  }

  return (
    <QueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Header />
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
        {modal}
      </HydrationBoundary>
    </QueryProvider>
  )
}
