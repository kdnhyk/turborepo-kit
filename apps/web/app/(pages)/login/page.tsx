'use client'

import { Page } from '@/(components)/layout/Page'
import { signin } from '@repo/api/auth'
import { Button } from '@repo/ui/Button'

const LoginPage = () => {
  return (
    <>
      <Page.Header title="로그인" />
      <Page.Layout>
        <Button onClick={signin.signInWithKakao}>Kakao로 로그인</Button>
        <Button onClick={signin.signInWithGoogle}>Google로 로그인</Button>
        <Button onClick={signin.signInWithApple}>Apple로 로그인</Button>
      </Page.Layout>
    </>
  )
}

export default LoginPage
