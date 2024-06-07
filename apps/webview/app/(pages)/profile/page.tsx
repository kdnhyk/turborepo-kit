'use client'

import UserProfile from '@/(components)/common/UserProfile'
import useSession from '@/hooks/use-session'
import { Loading } from '@repo/ui/loading'
import { useProfileSelf } from '@repo/query/user'
import Header from '@/(components)/common/Header'

export default function ProfilePage() {
  const { session } = useSession()
  const { data: profile } = useProfileSelf()

  return (
    <>
      <Header title="프로필" />
      {!session || !profile ? <Loading /> : <UserProfile user={session.user} />}
    </>
  )
}
