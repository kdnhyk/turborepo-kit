import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface HistoryState {
  history: string[] | null
  push: (link: string) => void
}
export const useHistory = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: null,
      push: (link: string) => {
        const prev = get().history

        if (prev === null) {
          set({ history: [link] })
          return
        }

        const history = [...prev, link]

        if (history.length > 4) {
          history.shift()
        }
        set({ history })
      },
    }),
    {
      name: 'history',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
