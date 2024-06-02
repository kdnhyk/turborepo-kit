import { createClient } from '@supabase/supabase-js'
import { Database } from '../database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl!, supabaseKey!, {
  auth: {
    persistSession: true,
    storageKey: 'Session',
    storage: window.localStorage,
    flowType: 'pkce',
  },
})

console.log('Tauri Supabase initialized')
