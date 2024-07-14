export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  console.log(`pv:${id} GET`)

  const count = (await redis.pfcount(rkey.post_view_count(id))) || 0

  return count
})
