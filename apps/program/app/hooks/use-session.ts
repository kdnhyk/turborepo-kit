import { Session } from '@supabase/supabase-js'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type SessionState = {
  session: Session | null
  setSession: (session: Session | null) => void
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session: Session | null) => set({ session }),
    }),
    {
      name: 'session',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useSession
