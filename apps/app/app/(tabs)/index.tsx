import useSession from '@/app/hooks/use-session'
import SessionWebview from '@/app/components/SessionWebview'
import Login from '@/app/components/Login'

export default function HomeScreen() {
  const { session } = useSession()

  return (
    <>{!session ? <Login /> : <SessionWebview path="" session={session} />}</>
  )
}
