import { Button } from '@repo/ui/Button'

export function HomeButtonsSkeleton() {
  return (
    <>
      <div className="mb-2 flex justify-end md:mb-4">
        <Button color="black" disable>
          New
        </Button>
      </div>
    </>
  )
}
