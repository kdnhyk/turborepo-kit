'use client'

import { Login } from '@/(components)/Login'
import { Profile } from '@/(components)/Profile'
import { useProfile } from '@repo/query/user'

export default function HomePage() {
  const { data: profile } = useProfile()

  return <>{profile ? <Profile profile={profile} /> : <Login />}</>
}
