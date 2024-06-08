import { Button } from '@repo/ui/Button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <div className="flex flex-col items-center">
        <p className="text-sm text-zinc-500">Not found page</p>
        <h2>찾을 수 없는 페이지입니다</h2>
      </div>
      <Link href="/">
        <Button>홈으로</Button>
      </Link>
    </div>
  )
}
