'use client'

import { useAuth } from '@repo/query/auth'
import { useProfileSelf } from '@repo/query/user'
import { Button } from '@repo/ui/Button'
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
        <p className="basis-[110px]">Email</p>
        <p>{user.email}</p>
      </div>

      <div className="flex items-center gap-2 p-3">
        <p className="basis-[110px]">Profile Image</p>
        {!profile.profile_image ? (
          <div className="aspect-square basis-[110px] rounded border"></div>
        ) : (
          <Image
            className="rounded border"
            src={`profile/${profile.profile_image}`}
            alt="Profile Image"
            width={80}
            height={80}
          />
        )}
      </div>

      <div className="flex items-center gap-2 p-3">
        <p className="basis-[110px]">Nickname</p>
        <p>{profile.nickname}</p>
      </div>

      <div className="flex justify-end p-3">
        <Link href="/profile/edit">
          <Button color="black">Edit</Button>
        </Link>
      </div>

      <div className="flex-1 border-y bg-zinc-100" />

      <div className="flex justify-end p-3">
        <Button onClick={logout} color="white">
          Logout
        </Button>
      </div>
    </div>
  )
}
