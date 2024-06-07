import supabase from '@repo/supabase'

export const getPublicUrl = (bucket: string, path: string) => {
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path)

  return publicUrl
}
