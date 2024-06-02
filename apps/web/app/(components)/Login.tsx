'use client'

import { signInWithOAuth } from '@repo/api/auth'
import { Button } from '@repo/ui/button'

export const Login = () => {
  return (
    <>
      <Button
        onClick={() =>
          signInWithOAuth('google', {
            redirectTo: window.location.origin + '/auth',
          })
        }
      >
        Google로 로그인
      </Button>
    </>
  )
}

export default Login
