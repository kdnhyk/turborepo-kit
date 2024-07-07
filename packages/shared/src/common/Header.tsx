'use client'

import { useUser } from '@repo/query/user'
import { BackIcon, HomeIcon, ProfileIcon } from '@repo/ui/icon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { data: user } = useUser()
  const { push, back, prefetch } = useRouter()

  return (
    <div className="fixed top-0 z-10 flex w-full shrink-0 basis-auto flex-col items-center bg-gradient-to-t from-white/0 to-white p-2 md:p-4">
      <header className="flex w-full max-w-[calc(1280px-32px)] flex-1 shrink-0 basis-12 items-center justify-between border bg-white shadow-inner">
        <Link
          href="/"
          className="flex h-12 basis-12 cursor-pointer items-center justify-center transition hover:scale-95 hover:bg-zinc-100"
          style={{
            order: isHome ? 1 : 3,
          }}
        >
          <HomeIcon />
        </Link>

        <div className="order-2 flex-1" />

        <div
          className="flex h-12 basis-12 cursor-pointer items-center justify-center transition hover:scale-95 hover:bg-zinc-100"
          onClick={() => back()}
          style={{
            display: isHome ? 'none' : 'flex',
            order: isHome ? 3 : 1,
          }}
        >
          <BackIcon />
        </div>

        <div
          className="order-4 flex h-12 basis-12 cursor-pointer items-center justify-center transition hover:scale-95 hover:bg-zinc-100"
          onClick={() => {
            if (user) {
              prefetch('/profile')
              push('/profile')
            } else {
              prefetch('/login')
              push('/login', { scroll: false })
            }
          }}
        >
          <ProfileIcon />
        </div>
      </header>
    </div>
  )
}
