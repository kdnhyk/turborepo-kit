'use client'

import { usePostMutation } from '@repo/query/post'
import { useProfileSelf } from '@repo/query/user'
import { Button } from '@repo/ui/Button'
import { useRouter } from 'next/navigation'

export default function PostButtons({
  id,
  userId,
}: {
  id: string
  userId: string | null
}) {
  const { data: profile } = useProfileSelf()

  if (profile?.user_id !== userId) {
    return null
  }

  const { remove } = usePostMutation()
  const { push } = useRouter()

  const handleRemove = async () => {
    remove.mutate(Number(id))
    push('/')
  }

  const handleEdit = () => {
    push(`/post/edit/${id}`)
  }

  return (
    <div className="flex gap-3">
      <Button color="white" onClick={handleRemove}>
        Delete
      </Button>
      <Button color="black" onClick={handleEdit}>
        Edit
      </Button>
    </div>
  )
}
