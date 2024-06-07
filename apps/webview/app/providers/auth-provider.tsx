'use client'

import { useCallback, useEffect } from 'react'
import { useProfileSelf, useProfileMutation } from '@repo/query/user'
import supabase from '@repo/supabase'
import useSession from '@/hooks/use-session'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: profile, refetch } = useProfileSelf()
  const { post } = useProfileMutation()
  const { session: prevSession, setSession } = useSession()

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
      } else if (event === 'SIGNED_OUT') {
        sendMessage(JSON.stringify({ type: 'SIGNED_OUT', value: null }))
        setSession(null)
      }
    })

    const receiveMessage = async (event: any) => {
      const data = JSON.parse(event.data) as { type: string; value: any }
      const type = data.type
      // alert(type)
      // alert(prevSession?.user.id)
      if (type === 'INITIAL_SESSION' && !prevSession) {
        const { access_token, refresh_token } = data.value

        const {
          data: { session },
        } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        })

        setSession(session)
        refetch()
      }
    }

    const receiver = navigator.userAgent.includes('Android') ? document : window
    receiver.addEventListener('message', receiveMessage)

    return () => {
      subscription.unsubscribe()
      receiver.removeEventListener('message', receiveMessage)
    }
  }, [])

  return <>{children}</>
}
