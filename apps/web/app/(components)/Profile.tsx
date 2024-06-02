'use client'

import { ProfileType } from '@repo/api/user'
import { useAuth } from '@repo/query/auth'
import { Button } from '@repo/ui/button'
import Link from 'next/link'

export const Profile = ({ profile }: { profile: ProfileType }) => {
  const { logout } = useAuth()

  return (
    <div className="flex flex-col gap-2">
      <p>{`안녕하세요, ${profile?.nickname}님`}</p>
      <div className="flex flex-col gap-2">
        <Link className="underline" href="/posts">
          글 목록
        </Link>
        <Link className="underline" href="/profile">
          프로필
        </Link>
        <Button onClick={logout}>로그아웃</Button>
      </div>
    </div>
  )
}
