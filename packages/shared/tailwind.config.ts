import type { Config } from 'tailwindcss'
import sharedConfig from '../../config/tailwind-config/tailwind.config'

const config: Config = {
  presets: [sharedConfig],
  content: ['./src/**/*.tsx'],
}

export default config
