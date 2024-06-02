import { useEffect } from 'react'
import { useProfile, useProfileMutation } from '@repo/query/user'
import { supabase } from '@repo/supabase'
import { usePathname } from 'next/navigation'
import { useHistory } from '@/hooks/use-hostory'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { push } = useHistory()
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

  useEffect(() => {
    push(pathname)
  }, [pathname])

  return <>{children}</>
}
