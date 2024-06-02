'use client'

import { useEffect } from 'react'
import { useHistory } from '@/hooks/use-hostory'
import { useRouter } from 'next/navigation'
import { Loading } from '@repo/ui/loading'

export default function Callback() {
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
