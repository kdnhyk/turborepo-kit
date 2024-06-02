import { supabase } from '@repo/supabase'

const postProfileImage = async (file: File, user_id: string, name: string) => {
  const { data, error } = await supabase.storage
    .from('profile')
    .upload(`${user_id}/${name}.webp`, file, {
      upsert: true,
      contentType: 'image/webp',
    })

  if (error) {
    console.log(error)
  }

  return `profile/${data?.path}`
}

const deleteProfileImage = async (user_id: string) => {
  const { data: list } = await supabase.storage
    .from('profile')
    .list(`${user_id}`)
  const filesToRemove = list?.map((x) => `${user_id}/${x.name}`)

  if (filesToRemove) {
    const { data, error } = await supabase.storage
      .from('profile')
      .remove(filesToRemove)

    if (error) {
      console.log(error)
    }

    return data
  }
}

export { postProfileImage, deleteProfileImage }
