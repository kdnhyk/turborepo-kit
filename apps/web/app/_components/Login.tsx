'use client'

import { useHistory } from '@/_hooks/use-history'
import { signInWithOAuth } from '@repo/api/auth'
import { Button } from '@repo/ui/Button'

export default function Login() {
  const { history } = useHistory()

  return (
    <div className="flex items-center justify-center py-10">
      <Button
        onClick={() =>
          signInWithOAuth('google', {
            redirectTo:
              window.location.origin + `/auth?next=${history?.at(-2)}`,
          })
        }
      >
        Sign in with Google
      </Button>
    </div>
  )
}
