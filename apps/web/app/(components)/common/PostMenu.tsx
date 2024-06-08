import { Button } from '@repo/ui/Button'
import Link from 'next/link'

export default function PostMenu() {
  return (
    <>
      <div className="flex justify-end p-3">
        <Link href="/post/new">
          <Button color="black">글 쓰기</Button>
        </Link>
      </div>
    </>
  )
}
