import { Session } from '@supabase/supabase-js'
import { create } from 'zustand'

type SessionState = {
  session: Session | null
  setSession: (session: Session | null) => void
}

const useSession = create<SessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}))

export default useSession
