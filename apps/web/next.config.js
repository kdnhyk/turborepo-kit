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
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      removeConsole: {
        exclude: ['error', 'warn'],
      },
    },
  }),
}
