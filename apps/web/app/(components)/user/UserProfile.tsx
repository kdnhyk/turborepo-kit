import { signout } from '@repo/api/auth'
import { useProfile } from '@repo/query/user'
import { Button } from '@repo/ui/Button'
import Link from 'next/link'

const UserProfile = () => {
  const { profile, resetProfile } = useProfile()

  const logout = () => {
    signout()
    resetProfile()
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <p>{`안녕하세요, ${profile.data?.nickname}님`}</p>
        <div className="flex flex-col items-end gap-2">
          <Link className="underline" href="/posts">
            글 목록
          </Link>
          <Button onClick={logout}>로그아웃</Button>
        </div>
      </div>
    </>
  )
}

export default UserProfile
