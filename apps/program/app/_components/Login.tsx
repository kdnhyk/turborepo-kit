'use client'

import useSignin from '@/hooks/use-signin'
import { Button } from '@repo/ui/Button'

export default function Login() {
  const { signinWithOauth } = useSignin()

  return (
    <div className="flex flex-1 items-center justify-center py-10">
      <Button onClick={() => signinWithOauth('google')}>
        Sign in with Google
      </Button>
    </div>
  )
}
