/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@repo/ui'],
  images: {
    domains: [process.env.NEXT_PUBLIC_SUPABASE_URL],
    loader: 'custom',
    loaderFile: './supabase-image-loader.ts',
  },
  output: 'export',
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      removeConsole: {
        exclude: ['error', 'warn'],
      },
    },
  }),
}
