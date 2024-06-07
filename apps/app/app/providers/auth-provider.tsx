import { useEffect } from 'react'
import { useProfileSelf, useProfileMutation } from '@repo/query/user'
import supabase from '@repo/supabase'
import useSession from '@/hooks/use-session'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: profile } = useProfileSelf()
  const { post } = useProfileMutation()
  const { setSession } = useSession()

  useEffect(() => {
    console.log('AuthProvider')

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event)
      console.log(session?.user.id)

      if (session && (event === 'INITIAL_SESSION' || event === 'SIGNED_IN')) {
        setSession(session)

        if (!profile) {
          post.mutate(session.user)
        }
      } else if (event === 'SIGNED_OUT') {
        setSession(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return <>{children}</>
}
