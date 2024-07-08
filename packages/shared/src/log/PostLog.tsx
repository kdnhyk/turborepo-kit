'use client'

import { useEffect } from 'react'
import { getBaseURL } from '@repo/query/get-base-url'

interface PostLogProps {
  type: 'incr_post_view'
  id: string
}

export function PostLog({ type, id }: PostLogProps) {
  useEffect(() => {
    fetch(`${getBaseURL()}/api/redis/${type}?id=${id}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then(console.log)
  }, [])
  return null
}
