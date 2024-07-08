'use client'

import { usePostState } from '@repo/query/post'
import { RefreshIcon } from '@repo/ui/icon'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function RefreshButton() {
  const { refresh } = useRouter()
  const { invalidatePost, invalidatePstPage } = usePostState()

  return (
    <div className="flex basis-8 sm:basis-10">
      <div
        className="flex h-full w-full cursor-pointer items-center justify-center transition hover:scale-95 hover:bg-white"
        onClick={() => {
          refresh()
          invalidatePost()
          invalidatePstPage()
          toast.info('Refreshed')
        }}
      >
        <RefreshIcon />
      </div>
    </div>
  )
}
