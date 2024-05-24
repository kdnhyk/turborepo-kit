'use client'

import { Page } from '@/(components)/layout/Page'
import UserProfile from '@/(components)/user/UserProfile'
import { useProfile } from '@repo/query/user'
import Link from 'next/link'

const HomePage = () => {
  const { profile } = useProfile()

  return (
    <>
      <Page.Header title="홈" />
      <Page.Layout>
        <>
          {profile.data ? (
            <UserProfile />
          ) : (
            <>
              <p>로그인 후 이용가능합니다</p>
              <Link className="underline" href="/login">
                로그인
              </Link>
            </>
          )}
        </>
      </Page.Layout>
    </>
  )
}

export default HomePage
