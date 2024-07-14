import { Database } from '@repo/supabase/database'
import { createClient as _createClient } from '@supabase/supabase-js'

export const supabase = _createClient<Database>(
  useRuntimeConfig().supabaseUrl,
  useRuntimeConfig().supabaseAnonKey,
)

export const createClient = (authHeader: string) =>
  _createClient<Database>(
    useRuntimeConfig().supabaseUrl,
    useRuntimeConfig().supabaseAnonKey,
    { global: { headers: { Authorization: authHeader } } },
  )
