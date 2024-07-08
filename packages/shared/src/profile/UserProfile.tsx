'use client'

import { useAuth } from '@repo/query/auth'
import { useProfileSelf, useUser } from '@repo/query/user'
import { Button } from '@repo/ui/Button'
import { Section } from '../layout/Section'
import { ProfileForm } from '../form/ProfileForm'
import { redirect } from 'next/navigation'
import { Badge } from '@repo/ui/Badge'
import { toast } from 'sonner'

export function UserProfile() {
  const { data: user } = useUser()
  const { data: profile } = useProfileSelf()
  const { logout } = useAuth()

  if (!user || !profile) redirect('/')

  return (
    <Section>
      <div className="flex items-center gap-2 overflow-x-hidden border p-2 sm:p-4">
        <p className="basis-[70px] text-sm sm:basis-[90px] sm:text-base">
          Email
        </p>
        <div className="flex gap-2">
          <p className="text-sm sm:text-base">{user.email}</p>
          <Badge variant="solid" transform="uppercase">
            {user.app_metadata.provider}
          </Badge>
        </div>
      </div>
      <ProfileForm />
      <div className="flex-1" />
      <div className="flex justify-end">
        <Button
          onClick={() => {
            logout()
            toast.success('Logged out')
          }}
          color="white"
        >
          Logout
        </Button>
      </div>
    </Section>
  )
}
