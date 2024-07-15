'use client'

import { useEffect } from 'react'
import { useProfileSelf, useProfileMutation } from '@repo/query/user'
import supabase from '@repo/supabase'
import { toast } from 'sonner'
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('@/_components/Login'))

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: profile } = useProfileSelf()
  const { post } = useProfileMutation()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event, session)
      console.log('profile', profile)

      if (session && (event === 'INITIAL_SESSION' || event === 'SIGNED_IN')) {
        if (!profile) {
          post.mutate(session.user)
        }
      }

      if (event === 'SIGNED_OUT') {
        toast.success('Signed out')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!profile) {
    return <Login />
  }

  return <>{children}</>
}
