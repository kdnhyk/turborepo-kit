'use client'

import { usePostViewCountById } from '@repo/query/post'

export function PostViewCount({ id }: { id: number }) {
  const { data: viewCount } = usePostViewCountById(id)
  console.log('viewCount', viewCount)

  return (
    <div className="flex gap-1 text-xs italic text-black/50">
      <p>{viewCount}</p>
      <p>views</p>
    </div>
  )
}
