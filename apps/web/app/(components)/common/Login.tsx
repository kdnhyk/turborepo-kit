'use client'

import { signInWithOAuth } from '@repo/api/auth'
import { Button } from '@repo/ui/Button'

export default function Login() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Button
        onClick={() =>
          signInWithOAuth('google', {
            redirectTo: window.location.origin + '/auth',
          })
        }
      >
        Google로 로그인
      </Button>
    </div>
  )
}
