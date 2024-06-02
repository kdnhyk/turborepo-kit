'use client'

import useSignin from '@/hooks/use-signin'
import { Button } from '@repo/ui/button'
import { Loading } from '@repo/ui/loading'

export const Login = () => {
  const { signinWithGoogle, isLoading } = useSignin()

  return (
    <>
      {!isLoading ? (
        <Button onClick={signinWithGoogle}>Google로 로그인</Button>
      ) : (
        <Loading />
      )}
    </>
  )
}
