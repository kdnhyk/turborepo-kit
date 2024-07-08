import { redis, rkey } from './client'
import { kstFormat } from '@repo/utils/date'

export const incrPostViewCount = async (id: string, user_id: string) => {
  const formattedDate = kstFormat(new Date())

  redis.pfadd(rkey.post_view_count(id), `${formattedDate}_${user_id}`)
  redis.expire(rkey.post_view_count(id), 3600 * 24 * 365 * 2) // 2 years
}

export const getPostViewCount = async (id: string) =>
  redis.pfcount(rkey.post_view_count(id)) || 0
