import supabase from '@repo/supabase'

const BUCKET = 'profile'

export const uploadProfileImage = async (
  file: File,
  user_id: string,
  name: string,
) => {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(`${user_id}/${name}.webp`, file, {
      upsert: true,
      contentType: 'image/webp',
    })

  if (error) {
    console.log(error)
  }

  return data?.path
}

export const removeProfileImage = async (user_id: string) => {
  const { data: list } = await supabase.storage.from(BUCKET).list(`${user_id}`)
  const filesToRemove = list?.map((x) => `${user_id}/${x.name}`)

  if (filesToRemove && filesToRemove.length > 0) {
    const { data, error } = await supabase.storage
      .from('profile')
      .remove(filesToRemove)

    if (error) {
      console.log(error)
    }

    return data
  }
}
