import supabase from '@repo/supabase'
import { QueryData } from '@supabase/supabase-js'

const TABLE = 'post'
export const POST_SELECTOR = `*`

const query = supabase.from('post').select(POST_SELECTOR).single()
export type PostMucisType = {
  index: number
  title: string
  artist: string
  url: string
}
export type PostType = Omit<QueryData<typeof query>, 'music'> & {
  music: PostMucisType[]
}

export const getPostPage = async (page: number) => {
  let i = page * 12
  let { data, error } = await supabase
    .from(TABLE)
    .select(POST_SELECTOR)
    .range(i, i + 11)
    .order('created_at', { ascending: false })
    .returns<PostType[] | null>()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getPostById = async (id: number) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select(POST_SELECTOR)
    .eq('id', id)
    .limit(1)
    .single<PostType | null>()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const insertPost = async (
  post: Omit<PostType, 'id' | 'created_at' | 'user_id' | 'profile'>,
) => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(post)
    .select(POST_SELECTOR)
    .single<PostType>()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const updatePost = async (post: { id: number } & Partial<PostType>) => {
  const { data, error } = await supabase
    .from(TABLE)
    .update(post)
    .eq('id', post.id)
    .select(POST_SELECTOR)
    .single<PostType>()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const removePost = async (id: number) => {
  const { data, error } = await supabase.from(TABLE).delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}
