'use client'

import { useEffect } from 'react'
import { useProfileSelf, useProfileMutation } from '@repo/query/user'
import supabase from '@repo/supabase'
import { usePathname } from 'next/navigation'
import { useHistory } from '@/hooks/use-history'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { push } = useHistory()
  const { data: profile } = useProfileSelf()
  const { post } = useProfileMutation()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event, session)

      if (session && (event === 'INITIAL_SESSION' || event === 'SIGNED_IN')) {
        if (!profile) {
          post.mutate(session.user)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    push(pathname)
  }, [pathname])

  return <>{children}</>
}
