'use client'

import { isServer } from '@tanstack/react-query'

export function getBaseURL() {
  // Tauri
  if (typeof window !== 'undefined' && window.__TAURI__) {
    return 'https://nogwon.com'
  }
  // Default(browser)
  if (!isServer) {
    return ''
  }
  // Server
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  // Localhost
  return 'http://localhost:3000'
}
