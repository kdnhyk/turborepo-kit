import { Button } from '@repo/ui/Button'
import Link from 'next/link'
import RefreshButton from './RefreshButton'

export function HomeButtons() {
  return (
    <>
      <div className="mb-2 flex justify-end gap-2 md:mb-4">
        <RefreshButton />
        <Link href="/post/new">
          <Button color="black">New</Button>
        </Link>
      </div>
    </>
  )
}
