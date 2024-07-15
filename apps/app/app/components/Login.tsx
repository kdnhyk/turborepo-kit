import { makeRedirectUri } from 'expo-auth-session'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import supabase from '@repo/supabase'
import { signInWithOAuth } from '@repo/api/auth'
import { Button } from '@repo/ui-app/Button'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from '@supabase/supabase-js'

WebBrowser.maybeCompleteAuthSession() // required for web only

const redirectTo = makeRedirectUri()

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url)

  if (errorCode) throw new Error(errorCode)
  const { access_token, refresh_token } = params

  if (!access_token || !refresh_token) return

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  })
  if (error) throw error
  return data.session
}

const siginInWithOauth = async (provider: Provider) => {
  const { data, error } = await signInWithOAuth(provider, {
    redirectTo,
    skipBrowserRedirect: true,
  })
  if (error) throw error

  const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo)

  if (res.type === 'success') {
    const { url } = res
    await createSessionFromUrl(url)
  }
}

export default function Login() {
  // Handle linking into app from email app.
  const url = Linking.useURL()
  if (url) createSessionFromUrl(url)

  return (
    <View style={styles.container}>
      <View className="flex w-full flex-row justify-center">
        <Text className="text-lg">Login</Text>
      </View>
      <Button
        onClick={async () => await siginInWithOauth('google')}
        color="black"
      >
        Sign in with Google
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
  },
})
