import { getUserId } from '../auth'
import { supabase } from '@repo/supabase'
import { ProfileType } from '@repo/types/profile'

const PROFILE_SELECOR = `user_id, profile_image, nickname`

const getProfile = async () => {
  const user_id = await getUserId()

  let { data, error } = await supabase
    .from('profile')
    .select(PROFILE_SELECOR)
    .eq('user_id', user_id)
    .limit(1)
    .maybeSingle()

  if (error) {
    console.log(error)
  }

  return data as ProfileType | null
}

const postProfile = async (profile: ProfileType) => {
  const { data, error } = await supabase
    .from('profile')
    .insert([profile])
    .select()
    .maybeSingle()

  if (error) {
    console.log(error)
  }
}

const updateProfile = async (profile: Partial<ProfileType>) => {
  const user_id = await getUserId()

  const { data, error } = await supabase
    .from('profile')
    .update([{ user_id, ...profile }])
    .eq('user_id', user_id)
    .select(PROFILE_SELECOR)
    .maybeSingle()

  if (error) {
    console.log(error)
  }

  return data as ProfileType
}

export { getProfile, postProfile, updateProfile }
