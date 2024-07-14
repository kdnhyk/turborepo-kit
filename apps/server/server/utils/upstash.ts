import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: useRuntimeConfig().upstashRedisRestUrl,
  token: useRuntimeConfig().upstashRedisRestToken,
})

export const rkey = {
  post_view_count: (post_id: string) => `pv:${post_id}`,
}
