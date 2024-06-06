'use client'

import { useEffect } from 'react'
import { useProfileSelf, useProfileMutation } from '@repo/query/user'
import supabase from '@repo/supabase'
import { useRouter } from 'next/navigation'
import useSession from '@/hooks/use-session'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: profile } = useProfileSelf()
  const { post } = useProfileMutation()
  const { replace } = useRouter()
  const { setSession } = useSession()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event, session)

      if (session && (event === 'INITIAL_SESSION' || event === 'SIGNED_IN')) {
        setSession(session)

        if (!profile) {
          post.mutate(session.user)
        }

        replace('/')
      } else if (event === 'SIGNED_OUT') {
        setSession(null)
        replace('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return <>{children}</>
}
