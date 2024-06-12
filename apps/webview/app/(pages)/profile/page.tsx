'use client'

import UserProfile from '@/(components)/common/UserProfile'
import useSession from '@/hooks/use-session'
import { Loading } from '@repo/ui/Loading'
import { useProfileSelf } from '@repo/query/user'
import Header from '@/(components)/common/Header'

export default function ProfilePage() {
  const { session } = useSession()
  const { data: profile } = useProfileSelf()

  return (
    <>
      <Header title="Profile" />
      {!session || !profile ? <Loading /> : <UserProfile user={session.user} />}
    </>
  )
}
