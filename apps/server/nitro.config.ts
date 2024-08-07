//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'app',
  preset: 'vercel-edge',
  runtimeConfig: {
    supabaseUrl: process.env.NITRO_SUPABASE_URL,
    supabaseAnonKey: process.env.NITRO_SUPABASE_ANON_KEY,
    upstashRedisRestUrl: process.env.NITRO_UPSTASH_REDIS_REST_URL,
    upstashRedisRestToken: process.env.NITRO_UPSTASH_REDIS_REST_TOKEN,
  },
  routeRules: {
    '/redis/**': {
      cors: true,
      // swr: 600,
    },
    '/api/**': {
      cors: true,
    },
  },
})
