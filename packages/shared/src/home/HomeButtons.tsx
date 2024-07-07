import { Button } from '@repo/ui/Button'
import Link from 'next/link'

export function HomeButtons() {
  return (
    <>
      <div className="mb-2 flex justify-end md:mb-4">
        <Link href="/post/new">
          <Button color="black">New</Button>
        </Link>
      </div>
    </>
  )
}
