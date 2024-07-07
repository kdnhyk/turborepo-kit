import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '프로필',
}

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
