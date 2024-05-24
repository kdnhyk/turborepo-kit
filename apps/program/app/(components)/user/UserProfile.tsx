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
      {profile.data ? (
        <div className="flex flex-col gap-2">
          <p>{`안녕하세요, ${profile.data?.nickname}님`}</p>
          <div className="flex flex-col items-end gap-2">
            <Link className="underline" href="/posts">
              글 목록
            </Link>
            <Link className="underline" href="/profile">
              프로필
            </Link>
            <Button onClick={logout}>로그아웃</Button>
          </div>
        </div>
      ) : (
        <>
          <p>로그인 후 이용가능합니다</p>
          <Link className="underline" href="/login">
            로그인
          </Link>
        </>
      )}
    </>
  )
}

export default UserProfile
