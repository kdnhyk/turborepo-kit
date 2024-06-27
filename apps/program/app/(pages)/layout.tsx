import Header from '@/(components)/common/Header'
import AuthProvider from '@/providers/auth-provider'
import { QueryProvider } from '@repo/query/provider'

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <QueryProvider>
      <Header />
      <AuthProvider>
        <main>{children} </main>
      </AuthProvider>
      {modal}
    </QueryProvider>
  )
}
