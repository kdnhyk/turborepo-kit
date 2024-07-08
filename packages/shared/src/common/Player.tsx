'use client'

import ReactPlayer from 'react-player'
import { usePlayer } from '../hooks/use-player'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { CloseIcon, HideIcon, OpenIcon } from '@repo/ui/icon'
import { PlayerMusicList } from './PlayerMusicList'

export function Player() {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerContainerRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<ReactPlayer | null>(null)
  const [isOpen, setIsOpen] = useState(true)
  const [isOpenList, setIsOpenList] = useState(false)
  const [duration, setDuratioin] = useState(0)
  const [progress, setProgress] = useState(0)
  const {
    list,
    index,
    playing,
    muted,
    setList,
    remove,
    next,
    setIndex,
    setPlaying,
    reset,
  } = usePlayer()
  if (!list || list.length < 1) return null

  return (
    <>
      <div
        className="fixed inset-0 -z-50 h-screen w-screen"
        ref={containerRef}
      ></div>
      <motion.div
        ref={playerContainerRef}
        className="group fixed bottom-2 left-2 z-30 flex w-fit flex-col overflow-hidden border bg-white shadow sm:bottom-4 sm:left-4"
        drag
        dragConstraints={containerRef}
        dragMomentum={false}
        dragElastic={0}
      >
        <div className="flex shrink-0 basis-10 justify-between border-b">
          <div
            className="flex basis-10 cursor-pointer items-center justify-center transition hover:bg-zinc-100"
            onClick={reset}
          >
            <CloseIcon />
          </div>
          <div
            className="flex basis-10 cursor-pointer items-end justify-center py-3 transition hover:bg-zinc-100"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <HideIcon /> : <OpenIcon />}
          </div>
        </div>
        <motion.div
          className="relative"
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
            origin: 'top',
          }}
        >
          <ReactPlayer
            ref={playerRef}
            url={list.at(index)?.url}
            width={300}
            height={200}
            config={{
              youtube: {
                playerVars: { showinfo: 0, controls: 0, modestbranding: 0 },
              },
              soundcloud: {
                options: { auto_play: true },
              },
            }}
            playing={playing}
            muted={muted}
            onEnded={() => next()}
            onDuration={(e) => setDuratioin(e)}
            onProgress={(e) => setProgress(e.playedSeconds)}
            onReady={(player) => console.log(player.getInternalPlayer())}
          />
          <div className="absolute inset-0 flex items-center justify-center transition hover:backdrop-blur">
            <div
              className="flex h-14 basis-14 cursor-pointer items-center justify-center rounded-full transition hover:drop-shadow-xl"
              onClick={() => {
                setPlaying(!playing)
              }}
            >
              <svg
                width="20"
                height="24"
                viewBox="0 0 20 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {playing ? (
                  <path d="M2 0V24M18 0V24" stroke="white" strokeWidth="4" />
                ) : (
                  <path
                    d="M2 20.3806V3.44636L16.1118 11.5103L2 20.3806Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="4"
                  />
                )}
              </svg>
            </div>
            <AnimatePresence>
              {isOpenList && (
                <motion.div
                  className="absolute inset-x-0 bottom-0"
                  initial={{
                    translateY: 12,
                  }}
                  animate={{
                    translateY: 0,
                  }}
                  exit={{
                    translateY: 12,
                  }}
                >
                  <div
                    className="absolute inset-x-0 bottom-2 h-2 border-y bg-white"
                    onClick={(event) => {
                      const x =
                        playerContainerRef.current?.getBoundingClientRect().x
                      console.log(x)

                      if (x) {
                        playerRef.current?.seekTo(
                          ((event.clientX - x) / 300) * duration,
                        )
                      }
                    }}
                  ></div>
                  <motion.div
                    className="absolute bottom-1 left-0 h-4 w-4 cursor-pointer rounded-full border bg-white"
                    drag="x"
                    dragConstraints={{ left: 0, right: 300 }}
                    dragMomentum={false}
                    dragElastic={0}
                    animate={{ x: (progress / duration) * 300 }}
                    transition={{ duration: 0 }}
                    onDragEnd={(event, info) => {
                      const x =
                        playerContainerRef.current?.getBoundingClientRect().x

                      if (x) {
                        playerRef.current?.seekTo(
                          ((info.point.x - x) / 300) * duration,
                        )
                      }
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        {isOpen && (
          <>
            <AnimatePresence>
              {isOpenList && (
                <PlayerMusicList
                  list={list}
                  index={index}
                  close={() => setIsOpenList(false)}
                  setIndex={setIndex}
                  remove={remove}
                  setList={setList}
                />
              )}
            </AnimatePresence>
            {!isOpenList && (
              <div
                className="absolute inset-x-0 bottom-0 flex translate-y-[100%] cursor-pointer items-center justify-center border-t bg-white transition group-hover:translate-y-0"
                onClick={() => setIsOpenList(true)}
              >
                <div className="">
                  <p className="text-sm">⬇</p>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </>
  )
}
