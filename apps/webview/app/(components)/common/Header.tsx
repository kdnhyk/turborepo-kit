'use client'

import { BackIcon, HomeIcon } from '@repo/ui/icon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const MainPages = ['Home', 'New', 'Profile']
const SubPages = ['Post Edit', 'Profile Edit']

type MainPagesType = (typeof MainPages)[number]
type SubPagesType = (typeof SubPages)[number]

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
export default function Header({
  title,
}: {
  title?: MainPagesType | SubPagesType
}) {
  const { back } = useRouter()

  console.log(title)

  return (
    <header className="text-18 sticky top-0 z-10 flex shrink-0 basis-12 items-center justify-between self-stretch border-b bg-white">
      <div className="flex basis-20 justify-start">
        {title === 'Home' ? (
          <HomeButton />
        ) : !MainPages.includes(title || '') ? (
          <div
            className="flex h-10 basis-10 cursor-pointer items-center justify-center"
            onClick={() => back()}
          >
            <BackIcon />
          </div>
        ) : null}
      </div>

      <p>{title}</p>

      <div className="flex basis-20 justify-end">
        {/* {title !== '홈' && <HomeButton />} */}
      </div>
    </header>
  )
}
