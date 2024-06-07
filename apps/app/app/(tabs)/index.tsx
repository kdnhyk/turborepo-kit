import useSession from '@/hooks/use-session'
import SessionWebview from '@/components/SessionWebview'

export default function HomeScreen() {
  const { session } = useSession()

  return <SessionWebview path="" session={session} />
}
