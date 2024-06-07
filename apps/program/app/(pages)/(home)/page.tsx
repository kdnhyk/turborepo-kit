import PostMenu from '@/(components)/common/PostMenu'
import PostPageList from '@/(components)/list/PostPageList'

export default function HomePage() {
  return (
    <>
      <PostMenu />
      <ul className="flex flex-1 flex-col divide-y">
        <PostPageList />
      </ul>
    </>
  )
}
