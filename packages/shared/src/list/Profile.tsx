'use client'

import { useProfileByUserId } from '@repo/query/user'
import Image from 'next/image'

export function Profile({ userId }: { userId: string }) {
  const { data: profile } = useProfileByUserId(userId)

  if (!profile) return null

  return (
    <div className="flex h-full flex-col items-center justify-around p-3">
      {!profile.profile_image ? (
        <div className="aspect-square w-10 rounded-full border object-contain"></div>
      ) : (
        <Image
          className="aspect-square w-10 rounded-full border object-contain"
          src={`profile/${profile.profile_image}`}
          alt="Profile Image"
          width={40}
          height={40}
        />
      )}

      <p className="line-clamp-1 whitespace-nowrap text-left text-sm">
        {profile.nickname}
      </p>
    </div>
  )
}
