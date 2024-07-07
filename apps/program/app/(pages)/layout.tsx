import AuthProvider from '@/_providers/auth-provider'
import { QueryProvider } from '@repo/query/provider'
import { Header } from '@repo/shared/Header'
import { Toaster } from 'sonner'
import { Player } from '@repo/shared/Player'

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <QueryProvider>
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
      </AuthProvider>
      {modal}
    </QueryProvider>
  )
}
