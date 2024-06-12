'use client'

import { BackIcon, HomeIcon, ProfileIcon } from '@repo/ui/icon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const pageTitles: { [key: string]: string } = {
  '/': 'Home',
  '/login': 'Login',
  '/auth/callback': 'Loading...',
  '/profile': 'Profile',
  '/profile/edit': 'Profile Edit',
  '/post': 'Posts',
  '/post/new': 'New Post',
}

function HomeButton() {
  return (
    <Link
      href="/"
      className="flex h-10 basis-10 cursor-pointer items-center justify-center"
    >
      <HomeIcon />
    </Link>
  )
}
export default function Header() {
  const pathname = usePathname()
  const title = pageTitles[pathname]
  const { push, back, prefetch } = useRouter()

  console.log(title)

  return (
    <header className="text-18 z-10 flex shrink-0 basis-12 items-center justify-between self-stretch border-b bg-white">
      <div className="flex basis-20 justify-start">
        {title === 'Home' ? (
          <HomeButton />
        ) : (
          <div
            className="flex h-10 basis-10 cursor-pointer items-center justify-center"
            onClick={() => back()}
          >
            <BackIcon />
          </div>
        )}
      </div>

      <p>{title}</p>

      <div className="flex basis-20 justify-end">
        {title !== 'Home' && <HomeButton />}
        <div
          className="flex h-10 basis-10 cursor-pointer items-center justify-center"
          onClick={() => {
            prefetch('/profile')
            push('/profile')
          }}
        >
          <ProfileIcon />
        </div>
      </div>
    </header>
  )
}
