import supabase from '@repo/supabase'
import { QueryData } from '@supabase/supabase-js'

export const PROFILE_SELECTOR = `user_id, profile_image, nickname`

const profileQuery = supabase.from('profile').select(PROFILE_SELECTOR).single()
export type ProfileType = QueryData<typeof profileQuery>

export const getProfileByUserId = async (user_id: string) => {
  const { data, error } = await supabase
    .from('profile')
    .select(PROFILE_SELECTOR)
    .eq('user_id', user_id)
    .single()

  if (error) {
    console.log(error)
  }

  return data
}

export const insertProfile = async (profile: ProfileType) => {
  const { data, error } = await supabase
    .from('profile')
    .insert(profile)
    .select(PROFILE_SELECTOR)
    .maybeSingle()

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
    .from('profile')
    .update(profile)
    .eq('user_id', user_id)
    .select(PROFILE_SELECTOR)
    .maybeSingle()

  if (error) {
    console.log(error)
  }

  return data
}
