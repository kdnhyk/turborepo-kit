import UserProfile from '@/(components)/common/UserProfile'
import { createClient } from '@/utils/supabase/server-component'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const revalidate = 0

export const metadata: Metadata = {
  title: '프로필',
  description: 'description',
}

export default async function ProfilePage() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <UserProfile user={session.user} />
    </>
  )
}
