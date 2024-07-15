import AuthProvider from '@/_providers/auth-provider'
import { QueryProvider } from '@repo/query/provider'
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
  return (
    <QueryProvider>
      <AuthProvider>
        <Player />
        <Header />
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
    </QueryProvider>
  )
}
