'use client'

import { useAuth } from '@repo/query/auth'
import { useProfileSelf, useUser } from '@repo/query/user'
import { Button } from '@repo/ui/Button'
import { Section } from '../layout/Section'
import { ProfileForm } from '../form/ProfileForm'
import { redirect } from 'next/navigation'

export function UserProfile() {
  const { data: user } = useUser()
  const { data: profile } = useProfileSelf()
  const { logout } = useAuth()

  if (!user || !profile) redirect('/')

  return (
    <Section>
      <div className="flex items-center gap-2 overflow-x-hidden border p-2 sm:p-4">
        <p className="basis-[110px]">Email</p>
        <p>
          {user.email}
          <span className="ml-2 rounded-full border bg-white px-2 py-1 text-xs uppercase">
            {user.app_metadata.provider}
          </span>
        </p>
      </div>
      <ProfileForm />
      <div className="flex-1" />
      <div className="flex justify-end">
        <Button onClick={logout} color="white">
          Logout
        </Button>
      </div>
    </Section>
  )
}
