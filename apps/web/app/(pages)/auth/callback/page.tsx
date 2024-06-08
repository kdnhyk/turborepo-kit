'use client'

import { useEffect } from 'react'
import { useHistory } from '@/hooks/use-history'
import { useRouter } from 'next/navigation'
import { Loading } from '@repo/ui/Loading'

export default function CallbackPage() {
  const { replace } = useRouter()
  const { history } = useHistory()

  useEffect(() => {
    if (history) {
      if (history && history.at(-3)) {
        replace(`${history.at(-3)}`)
        return
      }

      replace('/profile')
    }
  }, [history])

  return (
    <>
      <Loading />
    </>
  )
}
