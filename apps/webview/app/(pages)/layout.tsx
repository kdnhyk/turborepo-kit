import AuthProvider from '@/providers/auth-provider'
import { QueryProvider } from '@repo/query/provider'
import { Loading } from '@repo/ui/loading'
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
          <AuthProvider>
            <div className="flex w-full flex-1 flex-col md:w-[768px] md:border-x">
              {children}
            </div>
          </AuthProvider>
        </Suspense>
      </main>
    </QueryProvider>
  )
}
