import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { PostMucisType } from '@repo/api/post'

export type MusicType = Omit<PostMucisType, 'index'>

interface PlayerState {
  list: MusicType[] | null
  index: number
  playing: boolean
  muted: boolean
  push: (newItem: MusicType) => void
  remove: (index: number) => void
  setList: (list: MusicType[] | null) => void
  setIndex: (index: number) => void
  next: () => void
  setPlaying: (playing: boolean) => void
  setMuted: (muted: boolean) => void
  reset: () => void
  initialize: () => void
}

export const usePlayer = create<PlayerState>()(
  persist(
    (set, get) => ({
      list: null,
      index: 0,
      playing: false,
      muted: false,
      push: (newItem) => {
        const list = get().list || []
        if (list.find((el) => el.url === newItem.url)) return
        set({ list: list.concat(newItem) })
      },
      remove: (index) => {
        const { list, index: currentIndex, setIndex, setList } = get()
        if (!list) return

        if (list.length === 1) {
          setIndex(0)
          setList(null)
          return
        }

        set({
          list: list.filter((_, i) => i !== index),
          index: currentIndex >= index ? currentIndex - 1 : currentIndex,
        })
      },
      setList: (list) => {
        console.log(list)

        set({ list })
      },
      setIndex: (index) => set({ index }),
      next: () => {
        const { list, index } = get()
        if (!list) return

        if (index + 1 >= list.length) {
          set({ index: 0 })
          return
        }

        set({ index: index + 1 })
      },
      setPlaying: (playing) => set({ playing }),
      setMuted: (muted) => set({ muted }),
      reset: () => set({ list: null, index: 0, playing: false, muted: false }),
      initialize: () => {
        const { list, remove } = get()
        console.log(list)

        list?.map((el, i) => {
          if (!el) {
            remove(i)
          }
        })
      },
    }),
    {
      name: 'player',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.initialize()
      },
    },
  ),
)
