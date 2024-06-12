import { Button } from '@repo/ui/Button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <div className="flex flex-col items-center">
        <p className="text-sm text-zinc-500">404 Error</p>
        <h2>Not found page</h2>
      </div>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}
