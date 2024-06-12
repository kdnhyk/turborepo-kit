'use client'

import { usePostMutation } from '@repo/query/post'
import { Button } from '@repo/ui/Button'
import { useRouter } from 'next/navigation'

export default function PostButtons({ id }: { id: string }) {
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
