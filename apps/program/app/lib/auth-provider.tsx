'use client'

import { useEffect } from 'react'
import { useProfile, useProfileMutation } from '@repo/query/user'
import { supabase } from '@repo/supabase'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: profile } = useProfile()
  const { post } = useProfileMutation()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, _session) => {
      console.log(event, _session)

      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        if (!profile) {
          post.mutate()
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return <>{children}</>
}
