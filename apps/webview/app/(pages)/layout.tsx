import AuthProvider from '@/providers/auth-provider'
import { QueryProvider } from '@repo/query/provider'
import { Loading } from '@repo/ui/Loading'
import { Suspense } from 'react'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <main>
        <Suspense fallback={<Loading />}>
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
      </main>
    </QueryProvider>
  )
}
