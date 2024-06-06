'use client'

import useSignin from '@/hooks/use-signin'
import { Button } from '@repo/ui/button'

export default function Login() {
  const { signinWithGoogle } = useSignin()

  return (
    <div className="flex flex-1 items-center justify-center">
      <Button onClick={signinWithGoogle}>Google로 로그인</Button>
    </div>
  )
}
