import { useEffect, useRef } from 'react'
import WebView from 'react-native-webview'
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { Session } from '@supabase/supabase-js'
import { useAuth } from '@repo/query/auth'

const ORIGIN = 'http://192.168.45.187:3002'

export interface MessageType {
  type: string
  value: any
}

export default function Webview({
  path,
  session,
}: {
  path: string
  session: Session | null
}) {
  const webviewRef = useRef<WebView | null>(null)
  const { logout } = useAuth()

  useEffect(() => {
    console.log(session ? 'session' : 'no session')

    console.log(session?.user.id)
    console.log(webviewRef.current ? 'good' : 'bad')

    if (session) {
      const { access_token, refresh_token } = session

      webviewRef.current?.postMessage(
        JSON.stringify({
          type: 'INITIAL_SESSION',
          value: { access_token, refresh_token },
        } as MessageType),
      )
    }
  }, [session])
  //

  return (
    <WebView
      ref={webviewRef}
      style={styles.container}
      bounces={false}
      source={{
        uri: `${ORIGIN}/${path}`,
        headers: { 'Accept-Language': 'ko' },
      }}
      allowsBackForwardNavigationGestures={true}
      onMessage={(event) => {
        const data = JSON.parse(event.nativeEvent.data) as MessageType
        if (data.type === 'SIGNED_OUT') {
          logout()
        }
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
})
