import Link from 'next/link'

const PostsPage = () => {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <Link className="underline" href="/">
          Home
        </Link>
        <p className="text-xl italic">Do it yourself 😉</p>
      </div>
    </>
  )
}

export default PostsPage
