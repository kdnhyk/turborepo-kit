import '@repo/ui/styles'
import type { Metadata } from 'next'
import { inter, notoSansKr } from '@repo/ui/fonts'
import { baseUrl } from './_const/url'

export const metadata: Metadata = {
  title: 'Nogwon',
  description: 'Dear my green',
  metadataBase: new URL(baseUrl),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansKr.variable}`}>
      <body className="font-notoSans">{children}</body>
    </html>
  )
}
