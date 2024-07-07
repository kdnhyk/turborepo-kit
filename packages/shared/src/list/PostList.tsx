'use client'

import { PostType } from '@repo/api/post'
import { Profile } from './Profile'
import Link from 'next/link'
import { kstFormat } from '@repo/utils/date'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function PostList({ posts }: { posts: PostType[] }) {
  return (
    <>
      {posts.map((post) => {
        return (
          <motion.li
            className="flex h-fit min-w-[240px] max-w-full shrink-0 grow border bg-white shadow-inner md:max-w-[300px]"
            key={post.id}
            initial={{
              translateY: 20,
            }}
            whileTap={{
              scale: 0.96,
            }}
            whileHover={{
              scale: 1.02,
            }}
            whileInView={{
              translateY: 0,
            }}
          >
            <Link
              className="group flex flex-1 flex-col overflow-hidden bg-black"
              href={`/post/${post.id}`}
            >
              <div className="relative flex h-fit shrink-0 flex-col gap-2 border-b-[0.5px] border-dashed bg-white p-2">
                <div className="flex gap-2">
                  {post.image && (
                    <Image
                      className="aspect-square w-[52px] border object-cover"
                      src={`post/${post.image}`}
                      width={52}
                      height={52}
                      alt={post.title}
                    />
                  )}
                  <h2 className="line-clamp-1 text-lg font-semibold">
                    {post.title}
                  </h2>
                </div>
              </div>
              <div className="relative flex translate-y-0 border-t-[0.5px] border-dashed transition group-hover:translate-y-[4px]">
                <div className="flex flex-1 flex-col border-r-[0.5px] border-dashed bg-white p-2 text-black transition group-hover:translate-x-[-4px] group-hover:rounded-tr-[2px]">
                  <div className="relative flex flex-1 gap-2">
                    <p className="line-clamp-2 flex-1 text-sm">
                      {post.content}
                    </p>
                  </div>
                  <p className="text-end text-xs text-black/50">
                    {kstFormat(post.created_at)}
                  </p>
                </div>
                <div className="shrink-0 basis-[80px] overflow-hidden border-l-[0.5px] border-dashed bg-white group-hover:rounded-tl-[2px]">
                  {post.user_id && <Profile userId={post.user_id} />}
                </div>
              </div>
            </Link>
          </motion.li>
        )
      })}
    </>
  )
}
