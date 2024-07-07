import { HomeButtonsSkeleton } from '@repo/shared/HomeButtonsSkeleton'
import { PostPageListSkeleton } from '@repo/shared/PostPageListSkeleton'

export default function HomeLoading() {
  return (
    <>
      <HomeButtonsSkeleton />
      <PostPageListSkeleton />
    </>
  )
}
