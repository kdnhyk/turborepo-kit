'use client'

import { PostMucisType } from '@repo/api/post'
import { usePlayer } from '../hooks/use-player'
import { motion } from 'framer-motion'
import { Badge } from '@repo/ui/Badge'
import { toast } from 'sonner'

export function PostMusicList({ music }: { music: PostMucisType[] }) {
  const { list, push } = usePlayer()

  return (
    <>
      {music?.map((el) => {
        return (
          <motion.li
            key={el.index}
            className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-100"
            onClick={() => {
              const { index, ...rest } = el

              if (!list?.some((el) => el.url === rest.url)) {
                push(rest)
                toast.success(`Added: ${rest.artist} - ${rest.title}`)
              } else {
                toast.error(`Already added: ${rest.artist} - ${rest.title}`)
              }
            }}
          >
            <Badge>{el.artist || '〇'}</Badge>
            <p className="text-sm">{el.title || '〇'}</p>
          </motion.li>
        )
      })}
    </>
  )
}
