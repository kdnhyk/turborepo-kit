'use client'

import UserProfile from '@/(components)/common/UserProfile'
import useSession from '@/hooks/use-session'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfilePage() {
  const { session } = useSession()
  const { replace } = useRouter()

  useEffect(() => {
    if (!session) {
      replace('/login')
    }
  }, [session])

  return <>{session && <UserProfile user={session.user} />}</>
}
