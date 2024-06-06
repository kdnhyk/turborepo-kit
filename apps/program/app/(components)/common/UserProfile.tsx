'use client'

import { useAuth } from '@repo/query/auth'
import { useProfileSelf } from '@repo/query/user'
import { Button } from '@repo/ui/button'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'

export default function UserProfile({ user }: { user: User }) {
  const { data: profile } = useProfileSelf()
  const { logout } = useAuth()

  if (!profile) return null

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-2 p-4">
        <p className="basis-[80px]">이메일</p>
        <p>{user.email}</p>
      </div>

      <div className="flex items-center gap-2 p-3">
        <p className="basis-[80px]">프로필 사진</p>
        {!profile.profile_image ? (
          <div className="aspect-square basis-[80px] rounded border"></div>
        ) : (
          <Image
            className="rounded border"
            src={profile.profile_image}
            alt="Profile Image"
            width={80}
            height={80}
          />
        )}
      </div>

      <div className="flex items-center gap-2 p-3">
        <p className="basis-[80px]">이름</p>
        <p>{profile.nickname}</p>
      </div>

      <div className="flex justify-end p-3">
        <Link href="/profile/edit">
          <Button color="black">수정</Button>
        </Link>
      </div>

      <div className="flex-1 border-y bg-zinc-100" />

      <div className="flex justify-end p-3">
        <Button onClick={logout} color="white">
          로그아웃
        </Button>
      </div>
    </div>
  )
}
