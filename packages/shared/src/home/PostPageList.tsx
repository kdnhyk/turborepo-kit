'use client'

import { useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { usePostPage } from '@repo/query/post'
import { PostList } from '../list/PostList'
import { Loading } from '@repo/ui/Loading'

export function PostPageList() {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostPage()

  useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage()
    }
  }, [isInView])

  return (
    <>
      <ul className="flex flex-wrap items-start justify-center gap-2 md:gap-4">
        <PostList posts={data} />
      </ul>
      <div className="basis-10" ref={ref}></div>
      {isFetchingNextPage && <Loading variant="fixed" />}
    </>
  )
}
