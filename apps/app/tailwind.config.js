const sharedConfig = require('@repo/tailwind-config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedConfig],
  content: [
    './app/**/*.tsx',
    './components/**/*.tsx',
    './node_modules/@repo/ui/**/*.tsx',
    '../../packages/ui/**/*.tsx',
  ],
}
