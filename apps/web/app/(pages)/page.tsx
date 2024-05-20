'use client'

import UserProfile from '@/(components)/user/UserProfile'
import { signin } from '@repo/api/auth'
import { Button } from '@repo/ui/Button'
import { useProfile } from '@repo/query/user'

const HomePage = () => {
  const { profile } = useProfile()

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center gap-1 p-4">
        {profile.data ? (
          <UserProfile />
        ) : (
          <>
            <Button onClick={signin.signInWithKakao}>Kakao로 로그인</Button>
            <Button onClick={signin.signInWithGoogle}>Google로 로그인</Button>
            <Button onClick={signin.signInWithApple}>Apple로 로그인</Button>
          </>
        )}
      </div>
    </>
  )
}

export default HomePage
