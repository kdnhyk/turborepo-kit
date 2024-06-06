'use client'

import { useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { usePostPage } from '@repo/query/post'
import PostList from './PostList'

export default function PostPageList() {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref)
  const { data, fetchNextPage, hasNextPage } = usePostPage()

  useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage()
    }
  }, [isInView])

  return (
    <>
      {data.pages.map((page) => {
        return <PostList key={page.currentPage} posts={page.result} />
      })}
      <div className="basis-10" ref={ref}></div>
    </>
  )
}
