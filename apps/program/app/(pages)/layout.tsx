'use client'

import { Header } from '@/(components)/Header'
import AuthProvider from '@/lib/auth-provider'
import { QueryProvider } from '@repo/query/provider'
import { Loading } from '@repo/ui/loading'
import { Suspense } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryProvider>
        <Header />
        <main>
          <Suspense fallback={<Loading />}>
            <AuthProvider>{children}</AuthProvider>
          </Suspense>
        </main>
      </QueryProvider>
    </>
  )
}