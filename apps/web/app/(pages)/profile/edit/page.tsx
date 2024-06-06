import ProfileForm from '@/(components)/form/ProfileForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '프로필 수정',
  description: 'description',
}

export default async function ProfileEditPage() {
  return (
    <>
      <ProfileForm />
      <hr className="flex-1 bg-zinc-100" />
    </>
  )
}
