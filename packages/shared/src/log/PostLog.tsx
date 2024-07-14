'use client'

import { $fetch } from '@repo/api/server'
import { useEffect } from 'react'

interface PostLogProps {
  type: 'post_view_count'
  id: string
}

export function PostLog({ type, id }: PostLogProps) {
  useEffect(() => {
    $fetch(`/redis/${type}/${id}`, {
      method: 'POST',
    })
  }, [])
  return null
}
