'use client'

import { Reorder, motion } from 'framer-motion'
import { MusicType } from '../hooks/use-player'
import { toast } from 'sonner'
import { usePathname } from 'next/navigation'

export const PlayerMusicList = ({
  list,
  index,
  close,
  setIndex,
  remove,
  setList,
}: {
  list: MusicType[]
  index: number
  close: () => void
  setIndex: (index: number) => void
  remove: (index: number) => void
  setList: (list: MusicType[]) => void
}) => {
  const pathname = usePathname()
  const length = list.length

  const item = {
    hidden: (custom: number) => ({
      translateX: 12,
      backgroundColor: custom === index ? '#000' : '#fff',
      color: custom === index ? '#fff' : '#000',
      transition: {
        duration: 0.2,
        delay: (length - custom) * 0.05,
      },
    }),
    show: (custom: number) => ({
      translateX: 0,
      backgroundColor: custom === index ? '#000' : '#fff',
      color: custom === index ? '#fff' : '#000',
      transition: {
        duration: 0.2,
        delay: custom * 0.08,
      },
    }),
  }

  return (
    <Reorder.Group
      className="flex w-[300px] flex-col border-t bg-black"
      as="ul"
      initial={{
        height: 21,
      }}
      animate={{
        height: 'auto',
        transition: {
          duration: 0.3,
        },
      }}
      exit={{
        height: 0,
      }}
      onReorder={(values) => setList(values)}
      values={list}
    >
      {list.map((el, i) => {
        return (
          <Reorder.Item
            className="flex"
            key={el.url}
            value={el}
            drag="y"
            as="li"
            onClick={() => {
              setIndex(i)

              if (
                pathname.startsWith('/post/edit') ||
                pathname.startsWith('/post/new')
              ) {
                navigator.clipboard.writeText(el.url)
                toast.info(`Copied URL: ${el.artist} - ${el.title}`)
              }
            }}
          >
            <motion.div
              className="relative flex max-w-[300px] flex-1 gap-2 whitespace-nowrap px-1"
              custom={i}
              variants={item}
              initial="hidden"
              animate="show"
              whileHover={{ opacity: 0.8, translateX: -20 }}
            >
              <p className="text-sm">{el.artist ? `${el.artist} |` : '〇 |'}</p>
              <p className="text-sm">{el.title || '〇'}</p>

              <div className="absolute inset-y-0 right-0 flex w-5 translate-x-full bg-black">
                <div
                  className="flex w-5 cursor-pointer items-center justify-center p-1"
                  onClick={(event) => {
                    event.stopPropagation()
                    remove(i)
                  }}
                >
                  <div className="aspect-square h-full rounded-full bg-red-500"></div>
                </div>
              </div>
            </motion.div>
          </Reorder.Item>
        )
      })}
      <div
        className="sticky bottom-0 flex cursor-pointer items-center justify-center border-t border-dashed bg-white"
        onClick={(event) => {
          event.stopPropagation()
          close()
        }}
      >
        <div>
          <p className="text-sm">⬆</p>
        </div>
      </div>
    </Reorder.Group>
  )
}
