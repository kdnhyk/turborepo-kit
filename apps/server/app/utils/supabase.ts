import { Database } from '@repo/supabase/database'
import { createClient as _createClient } from '@supabase/supabase-js'

export const supabase = _createClient<Database>(
  process.env.NITRO_SUPABASE_URL,
  process.env.NITRO_SUPABASE_ANON_KEY,
)

export const createClient = (authHeader: string) =>
  _createClient<Database>(
    process.env.NITRO_SUPABASE_URL,
    process.env.NITRO_SUPABASE_ANON_KEY,
    { global: { headers: { Authorization: authHeader } } },
  )
