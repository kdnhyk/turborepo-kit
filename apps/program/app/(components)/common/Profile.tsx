'use client'

import { useProfile } from '@repo/query/user'
import Image from 'next/image'

export default function Profile({ userId }: { userId: string }) {
  const { data: profile } = useProfile(userId)

  if (!profile) return null

  return (
    <div className="flex flex-col p-3">
      {!profile.profile_image ? (
        <div className="aspect-square w-10 rounded-full border"></div>
      ) : (
        <Image
          className="rounded-full border"
          src={`profile/${profile.profile_image}`}
          alt="Profile Image"
          width={40}
          height={40}
        />
      )}

      <p className="text-sm">{profile.nickname}</p>
    </div>
  )
}
