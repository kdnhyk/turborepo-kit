import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface HistoryState {
  history: string[] | null
  push: (link: string) => void
  initialize: () => void
}

export const useHistory = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: null,
      push: (link: string) => {
        const prev = get().history || []

        const updatedHistory = [...prev, link].slice(-2)

        set({ history: updatedHistory })
      },
      initialize: () => {
        const prev = get().history || []

        if (prev.length > 2) {
          set({ history: prev.slice(-2) })
        }
      },
    }),
    {
      name: 'history',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.initialize()
      },
    },
  ),
)
