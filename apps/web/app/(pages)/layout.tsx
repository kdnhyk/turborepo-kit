import AuthProvider from '@/_providers/auth-provider'
import { QueryProvider } from '@repo/query/provider'
import { getQueryClient } from '@repo/query/get-query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import {
  getUserId,
  prefetchProfileSelf,
  prefetchUser,
} from '@/utils/supabase/dynamic-prefetch'
import { Header } from '@repo/shared/Header'
import dynamic from 'next/dynamic'

const Toaster = dynamic(() => import('sonner').then((mod) => mod.Toaster))
const NavigationEvents = dynamic(() => import('@/_components/NavigationEvents'))
const Player = dynamic(() =>
  import('@repo/shared/Player').then((mod) => mod.Player),
)

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const queryClient = getQueryClient()
  const user_id = await getUserId()
  if (user_id) {
    await prefetchUser(queryClient)
    await prefetchProfileSelf(queryClient, user_id)
  }

  return (
    <QueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Player />
        <Header />
        <AuthProvider>
          <main>{children}</main>
          <Toaster
            toastOptions={{
              style: {
                border: '1px solid #000',
                borderRadius: '0px',
              },
            }}
          />
          <NavigationEvents />
        </AuthProvider>
        {modal}
      </HydrationBoundary>
    </QueryProvider>
  )
}
