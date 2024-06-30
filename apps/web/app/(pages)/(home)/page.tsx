import PostPageList from '@/(components)/list/PostPageList'

export default function HomePage() {
  return (
    <>
      <ul className="grid flex-1 grid-cols-1 gap-2 md:gap-4 lg:grid-cols-2">
        <PostPageList />
      </ul>
    </>
  )
}
