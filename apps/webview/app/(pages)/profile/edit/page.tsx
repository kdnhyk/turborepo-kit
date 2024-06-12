import Header from '@/(components)/common/Header'
import ProfileForm from '@/(components)/form/ProfileForm'

export default async function ProfileEditPage() {
  return (
    <>
      <Header title="Profile Edit" />
      <ProfileForm />
      <hr className="flex-1 bg-zinc-100" />
    </>
  )
}
