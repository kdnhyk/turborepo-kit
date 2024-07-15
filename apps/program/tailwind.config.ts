import type { Config } from 'tailwindcss'
import sharedConfig from '../../config/tailwind-config/tailwind.config'

const config: Pick<Config, 'presets' | 'content'> = {
  presets: [sharedConfig],
  content: [
    './app/**/*.{tsx,mdx}',
    './node_modules/@repo/ui/**/*.tsx',
    './node_modules/@repo/shared/**/*.tsx',
  ],
}

export default config
