'use client'

import PostBottoms from '@/(components)/common/PostButtons'
import useSession from '@/hooks/use-session'
import { usePost } from '@repo/query/post'
import { notFound, useSearchParams } from 'next/navigation'

export default function PostPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { session } = useSession()
  const { data: post } = usePost(Number(id))

  if (!id || !post) {
    notFound()
  }

  const { title, content, user_id } = post

  return (
    <>
      <div className="flex flex-1 flex-col divide-y">
        <div className="flex justify-between p-3">
          <h2 className="text-xl font-bold">{title}</h2>
          {user_id === session?.user.id && <PostBottoms id={id} />}
        </div>
        <p className="flex-1 p-3">{content}</p>
      </div>
    </>
  )
}
