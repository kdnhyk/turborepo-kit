'use client'

import PostForm from '@/(components)/form/PostForm'
import useSession from '@/hooks/use-session'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NewPage() {
  const { session } = useSession()
  const { replace } = useRouter()

  useEffect(() => {
    if (!session) {
      replace('/login')
    }
  }, [session])

  return (
    <>
      <PostForm />
    </>
  )
}
