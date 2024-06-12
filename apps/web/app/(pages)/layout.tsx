import Header from '@/(components)/common/Header'
import AuthProvider from '@/providers/auth-provider'
import { QueryProvider } from '@repo/query/provider'
import { Loading } from '@repo/ui/Loading'
import { Suspense } from 'react'

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
      <main>
        <Suspense fallback={<Loading />}>
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
      </main>
      {modal}
    </QueryProvider>
  )
}
