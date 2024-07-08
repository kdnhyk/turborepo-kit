'use client'

import { PostType } from '@repo/api/post'
import { usePostMutation } from '@repo/query/post'
import { useUser } from '@repo/query/user'
import { Button } from '@repo/ui/Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { isTauri } from '../utils/env'

export function PostButtons({ post }: { post: PostType }) {
  const { data: user } = useUser()
  if (!user || user.id !== post.user_id) return null

  const { remove } = usePostMutation()
  const { push } = useRouter()
  const [isDelete, setIsDelete] = useState(false)

  const handleRemove = async () => {
    if (!isDelete) {
      setIsDelete(true)
      return
    }

    remove.mutate({ id: post.id, user_id: user.id })
    push('/')
  }

  const handleEdit = () => {
    push(!isTauri ? `/post/edit/${post.id}` : `/post/edit?id=${post.id}`)
  }

  return (
    <div className="mb-2 flex justify-end gap-2 sm:mb-4 sm:gap-4">
      <Button color={!isDelete ? 'white' : 'red'} onClick={handleRemove}>
        {!isDelete ? 'Delete' : 'Confirm'}
      </Button>
      <Button color="black" onClick={handleEdit}>
        Edit
      </Button>
    </div>
  )
}
