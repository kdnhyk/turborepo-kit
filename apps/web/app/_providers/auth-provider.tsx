'use client'

import { useCallback, useEffect } from 'react'
import { useProfileSelf, useProfileMutation } from '@repo/query/user'
import supabase from '@repo/supabase'
import { Message } from '@repo/const/message'
import { toast } from 'sonner'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: profile, refetch } = useProfileSelf()
  const { post } = useProfileMutation()

  const sendMessage = useCallback((str: string) => {
    window?.ReactNativeWebView?.postMessage(str)
  }, [])

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

      if (event === 'SIGNED_OUT') {
        toast.success('Signed out')
        sendMessage(
          JSON.stringify({ type: 'SIGNED_OUT', value: null } as Message),
        )
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ReactNativeWebView) return

    const receiveMessage = async (event: any) => {
      const { type, value } = JSON.parse(event.data) as Message

      if (type === 'INITIAL_SESSION') {
        const { access_token, refresh_token } = value
        const {
          data: { session },
        } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        })

        console.log('Signin', session)

        refetch()
      }
    }

    const receiver = navigator.userAgent.includes('Android') ? document : window
    receiver.addEventListener('message', receiveMessage)

    return () => receiver.removeEventListener('message', receiveMessage)
  }, [])

  return <>{children}</>
}
