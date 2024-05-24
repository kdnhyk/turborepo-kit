'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUser } from '@repo/api/auth'
import { getProfile, postProfile } from '@repo/api/user'
import { Loading } from '@repo/ui/Loading'

const CallbackPage = () => {
  const router = useRouter()

  useEffect(() => {
    const callback = async () => {
      const user = await getUser()

      if (user) {
        const profile = await getProfile()

        if (!profile) {
          postProfile({
            user_id: user.id,
            profile_image: user.user_metadata.avatar_url,
            nickname: user.user_metadata.name,
          })
        }
      }

      router.push('/')
    }

    callback()
  }, [])

  return (
    <>
      <Loading />
    </>
  )
}

export default CallbackPage
