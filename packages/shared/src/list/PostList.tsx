'use client'

import { PostType } from '@repo/api/post'
import { Profile } from './Profile'
import Link from 'next/link'
import { kstFormat } from '@repo/utils/date'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { isTauri } from '../utils/env'

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
              className="group flex flex-1 flex-col overflow-hidden"
              href={!isTauri ? `/post/${post.id}` : `/post?id=${post.id}`}
            >
              <div className="relative flex h-fit shrink-0 flex-col bg-white p-2">
                <div className="flex gap-2">
                  {/* Image */}
                  {post.image && (
                    <Image
                      className="aspect-square w-[52px] border object-cover"
                      src={`post/${post.image}`}
                      width={52}
                      height={52}
                      alt={post.title}
                    />
                  )}
                  {/* Title */}
                  <h2 className="line-clamp-1 text-lg font-semibold">
                    {post.title}
                  </h2>
                </div>
                {/* Date */}
                <p className="text-end text-xs text-black/50">
                  {kstFormat(post.updated_at)}
                </p>
              </div>
              <div className="flex flex-1">
                <div className="relative flex flex-1 flex-col">
                  {/* Music */}
                  <div className="absolute inset-0 flex">
                    <p className="line-clamp-3 flex-1 p-2 text-xs">
                      {post.music
                        .map((el) => `${el.artist || '〇'} - ${el.title}`)
                        .join(', ')}
                    </p>
                  </div>
                  {/* Content */}
                  <div className="flex flex-1 translate-x-[-1px] gap-2 border-t bg-white p-2 transition group-hover:translate-y-[calc(100%-8px)]">
                    <p className="line-clamp-2 flex-1 text-sm ">
                      {post.content}
                    </p>
                  </div>
                </div>
                <div className="relative shrink-0 basis-[80px] overflow-hidden">
                  {/* Empty */}
                  <div className="absolute inset-0 shrink-0 basis-[80px]">
                    <div></div>
                  </div>
                  {/* Profile */}
                  <div className="flex-1 border-l border-t bg-white">
                    {post.user_id && <Profile userId={post.user_id} />}
                  </div>
                </div>
              </div>
            </Link>
          </motion.li>
        )
      })}
    </>
  )
}
