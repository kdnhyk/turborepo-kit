export default defineEventHandler((event) => {
  const origin = getRequestHeader(event, 'origin')
  const allowedOrigins = ['http://localhost:3000', 'https://nogwon.com']

  if (allowedOrigins.includes(origin)) {
    setResponseHeader(event, 'Access-Control-Allow-Origin', origin)
    setResponseHeader(
      event,
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    )
    setResponseHeader(
      event,
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    )
  }
})
