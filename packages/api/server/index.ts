import { getToken } from '../src/auth'

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : process.env.NEXT_PUBLIC_BASE_URL

/**
 * Default
 * @param url
 * @param options
 * @returns
 */
export const _fetch = async (url: string, options?: RequestInit) =>
  fetch(`${BASE_URL}${url}`, { ...options })

/**
 * With Authorization
 * @param url
 * @param options
 * @returns
 */
export const $fetch = async (url: string, options?: RequestInit) =>
  fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: { Authorization: `Bearer ${await getToken()}` },
  })
