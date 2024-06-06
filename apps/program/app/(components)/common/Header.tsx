'use client'

import { BackIcon, HomeIcon, ProfileIcon } from '@repo/ui/icon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const pageTitles: { [key: string]: string } = {
  '/': '홈',
  '/login': '로그인',
  '/auth/callback': '로딩중',
  '/profile': '프로필',
  '/profile/edit': '프로필 수정',
  '/post': '글 목록',
  '/post/new': '글 쓰기',
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
    <header className="text-18 z-10 flex shrink-0 basis-12 items-center justify-between border-b bg-white">
      <div className="flex basis-20 justify-start">
        {title === '홈' ? (
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
        {title !== '홈' && <HomeButton />}
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
