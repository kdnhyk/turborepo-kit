import { PostType } from '@repo/api/post'
import Profile from '../common/Profile'
import Link from 'next/link'
import { formmatedDate } from '@repo/utils/date'

export default function PostList({ posts }: { posts: PostType[] }) {
  return (
    <>
      {posts.map((post) => {
        return (
          <li className="flex flex-col" key={post.id}>
            <Link href={`/post/${post.id}`}>
              {post.user_id && <Profile userId={post.user_id} />}
              <div className="px-3 pb-3">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p>{post.content}</p>
              </div>
              <div className="flex justify-end px-3 pb-3">
                <p className="text-sm text-zinc-700">
                  {formmatedDate(post.created_at)}
                </p>
              </div>
            </Link>
          </li>
        )
      })}
    </>
  )
}
