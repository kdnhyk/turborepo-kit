'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useHistory } from '@/_hooks/use-history'

export default function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { push } = useHistory()

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    console.log(url)
    // You can now use the current URL
    push(url)
  }, [pathname, searchParams])

  return null
}
