import Header from '@/(components)/common/Header'
import ProfileForm from '@/(components)/form/ProfileForm'

export default async function ProfileEditPage() {
  return (
    <>
      <Header title="프로필 수정" />
      <ProfileForm />
      <hr className="flex-1 bg-zinc-100" />
    </>
  )
}
