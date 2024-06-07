import '@/styles/globals.css'
import '@repo/ui/styles'
import type { Metadata } from 'next'
import { inter } from './styles/fonts'

export const metadata: Metadata = {
  title: 'Turborepo Kit',
  description: 'Generated by 영원',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
