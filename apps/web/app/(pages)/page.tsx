'use client'

import { Page } from '@/(components)/layout/Page'
import UserProfile from '@/(components)/user/UserProfile'
import { Loading } from '@repo/ui/Loading'
import { Suspense } from 'react'

const HomePage = () => {
  return (
    <>
      <Page.Header title="홈" />
      <Page.Layout>
        <Suspense fallback={<Loading />}>
          <UserProfile />
        </Suspense>
      </Page.Layout>
    </>
  )
}

export default HomePage
