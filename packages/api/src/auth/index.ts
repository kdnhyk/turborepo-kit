import { User } from '@supabase/supabase-js'
import { supabase } from '../supabase'

const signin = {
  signInWithKakao: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: window.location.origin + '/auth/callback',
      },
    })

    if (error) {
      console.log(error)
    }
  },

  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.log(error)
    }
  },

  signInWithApple: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: window.location.origin + '/auth/callback',
      },
    })

    if (error) {
      console.log(error)
    }
  },
}

const signout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log(error)
  }
}

const getUser: () => Promise<User | null> = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  return user
}

const getUserId: () => Promise<string | null> = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  return session.user.id
}

export { signin, signout, getUser, getUserId }
