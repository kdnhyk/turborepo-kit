import Login from '@/components/Login'
import useSession from '@/hooks/use-session'
import SessionWebview from '@/components/SessionWebview'

export default function ProfileScreen() {
  const { session } = useSession()

  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <SessionWebview path="/profile" session={session} />
      )}
    </>
  )
}
