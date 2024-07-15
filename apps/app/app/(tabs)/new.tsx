import Login from '@/app/components/Login'
import useSession from '@/app/hooks/use-session'
import SessionWebview from '@/app/components/SessionWebview'

export default function ProfileScreen() {
  const { session } = useSession()

  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <SessionWebview path="/post/new" session={session} />
      )}
    </>
  )
}
