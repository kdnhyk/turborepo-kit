import { kstFormat } from '@repo/utils/date'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  console.log(`pv:${id} POST`)

  const { authorization } = getRequestHeaders(event)
  const supabase = createClient(authorization)
  const user_id = (await supabase.auth.getUser()).data.user?.id

  if (user_id) {
    const formattedDate = kstFormat(new Date())

    redis.pfadd(rkey.post_view_count(id), `${formattedDate}_${user_id}`)
    redis.expire(rkey.post_view_count(id), 3600 * 24 * 365 * 2) // 2 years

    return 'Success'
  }

  return 'Fail'
})
