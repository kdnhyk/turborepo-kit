'use client'

import { QueryProvider } from '@repo/query/provider'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProvider>
        <main>{children}</main>
      </QueryProvider>
    </>
  )
}

export default RootLayout
