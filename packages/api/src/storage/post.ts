import supabase from '@repo/supabase'

const BUCKET = 'post'

export const uploadPostImage = async (
  file: File,
  user_id: string,
  post_id: number,
  name: string,
) => {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(`${user_id}/${post_id}/${name}.webp`, file, {
      upsert: true,
      contentType: 'image/webp',
    })

  if (error) {
    console.log(error)
  }

  return data?.path
}

export const removePostImage = async (user_id: string, post_id: number) => {
  const { data: list } = await supabase.storage
    .from(BUCKET)
    .list(`${user_id}/${post_id}`)
  const filesToRemove = list?.map((x) => `${user_id}/${post_id}/${x.name}`)

  if (filesToRemove && filesToRemove.length > 0) {
    const { data, error } = await supabase.storage
      .from('post')
      .remove(filesToRemove)

    if (error) {
      console.log(error)
    }

    return data
  }
}
