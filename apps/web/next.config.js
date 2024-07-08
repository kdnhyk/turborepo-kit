/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: [
    '@repo/api',
    '@repo/supabase',
    '@repo/query',
    '@repo/ui',
    '@repo/utils',
    '@repo/shared',
    '@repo/const',
  ],
  reactStrictMode: false,
  images: {
    domains: [process.env.NEXT_PUBLIC_SUPABASE_URL],
    loader: 'custom',
    loaderFile: '../../supabase-image-loader.ts',
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3001',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      removeConsole: {
        exclude: ['error', 'warn'],
      },
    },
  }),
}
