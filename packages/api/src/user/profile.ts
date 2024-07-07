import supabase from '@repo/supabase'
import { QueryData } from '@supabase/supabase-js'

const TABLE = 'profile'
export const PROFILE_SELECTOR = `*`

const profileQuery = supabase.from('profile').select(PROFILE_SELECTOR).single()
export type ProfileType = QueryData<typeof profileQuery>

export const getProfileByUserId = async (user_id: string) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select(PROFILE_SELECTOR)
    .eq('user_id', user_id)
    .single<ProfileType | null>()

  if (error) {
    console.log(error)
  }

  return data
}

export const insertProfile = async (
  profile: Omit<ProfileType, 'created_at'>,
) => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(profile)
    .select(PROFILE_SELECTOR)
    .single<ProfileType>()

  if (error) {
    console.log(error)
  }

  return data
}

export const updateProfile = async (
  user_id: string,
  profile: Partial<ProfileType>,
) => {
  const { data, error } = await supabase
    .from(TABLE)
    .update(profile)
    .eq('user_id', user_id)
    .select(PROFILE_SELECTOR)
    .single<ProfileType>()

  if (error) {
    console.log(error)
  }

  return data
}
