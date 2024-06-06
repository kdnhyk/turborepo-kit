import supabase from '@repo/supabase'
import { QueryData } from '@supabase/supabase-js'

export const POST_SELECTOR = `id, created_at, user_id, title, content`

const query = supabase.from('post').select(POST_SELECTOR).single()
export type PostType = QueryData<typeof query>

export const getPostPage = async (page: number) => {
  let i = page * 12
  let { data, error } = await supabase
    .from('post')
    .select(POST_SELECTOR)
    .range(i, i + 11)
    .order('created_at', { ascending: false })

  if (error) {
   throw new Error(error.message)
  }

  return data as PostType[]
}

export const getPostById = async (id: number) => {
  const { data, error } = await supabase
    .from('post')
    .select(POST_SELECTOR)
    .eq('id', id)
    .single()

  if (error) {
   throw new Error(error.message)
  }

  return data
}

export const insertPost = async (
  post: Omit<PostType, 'id' | 'created_at' | 'user_id' | 'profile'>,
) => {
  const { data, error } = await supabase
    .from('post')
    .insert(post)
    .select(POST_SELECTOR)
    .limit(1)
    .single()

  if (error) {
   throw new Error(error.message)
  }

  return data
}

export const updatePost = async (post: { id: number } & Partial<PostType>) => {
  const { data, error } = await supabase
    .from('post')
    .update(post)
    .eq('id', post.id)
    .select(POST_SELECTOR)
    .single()

  if (error) {
   throw new Error(error.message)
  }

  return data
}

export const removePost = async (id: number) => {
  const { data, error } = await supabase.from('post').delete().eq('id', id)

  if (error) {
   throw new Error(error.message)
  }
}
