import { supabase } from '@repo/supabase'
import { QueryData } from '@supabase/supabase-js'

const SELECOR = `user_id, profile_image, nickname`

const profileQuery = supabase.from('profile').select(SELECOR).single()
export type ProfileType = QueryData<typeof profileQuery>

const getProfileByUserId = async (user_id: string) => {
  const { data, error } = await supabase
    .from('profile')
    .select(SELECOR)
    .eq('user_id', user_id)
    .single()

  if (error) {
    console.log(error)
  }

  return data
}

const postProfile = async (profile: ProfileType) => {
  const { data, error } = await supabase
    .from('profile')
    .insert(profile)
    .select(SELECOR)
    .maybeSingle()

  if (error) {
    console.log(error)
  }

  return data
}

const updateProfile = async (
  user_id: string,
  profile: Partial<ProfileType>,
) => {
  const { data, error } = await supabase
    .from('profile')
    .update(profile)
    .eq('user_id', user_id)
    .select(SELECOR)
    .maybeSingle()

  if (error) {
    console.log(error)
  }

  return data
}

export { getProfileByUserId, postProfile, updateProfile }
