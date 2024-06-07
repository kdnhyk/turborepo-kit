import type { Config } from 'tailwindcss'
import sharedConfig from '@repo/tailwind-config'

const config: Pick<Config, 'presets' | 'content'> = {
  presets: [sharedConfig],
  content: ['./app/**/*.{tsx,mdx}', './node_modules/@repo/ui/**/*.tsx'],
}
export default config
