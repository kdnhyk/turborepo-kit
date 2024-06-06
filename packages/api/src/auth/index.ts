import { Provider } from '@supabase/supabase-js'
import supabase from '@repo/supabase'

interface SigninOptions {
  redirectTo?: string | undefined
  scopes?: string | undefined
  queryParams?:
    | {
        [key: string]: string
      }
    | undefined
  skipBrowserRedirect?: boolean | undefined
}

const signInWithOAuth = async (provider: Provider, options?: SigninOptions) =>
  await supabase.auth.signInWithOAuth({
    provider,
    options,
  })

const signout = async () => await supabase.auth.signOut()

const getUser = async () => (await supabase.auth.getUser()).data.user

const getUserId = async () =>
  (await supabase.auth.getSession()).data.session?.user.id

export { signInWithOAuth, signout, getUser, getUserId }
