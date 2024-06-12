import { Button } from '@repo/ui/Button'
import Link from 'next/link'

export default function PostMenu() {
  return (
    <>
      <div className="flex justify-end p-3">
        <Link href="/post/new">
          <Button color="black">New</Button>
        </Link>
      </div>
    </>
  )
}
