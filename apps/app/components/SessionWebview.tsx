import { useEffect, useRef, useState } from 'react'
import WebView from 'react-native-webview'
import { StyleSheet, BackHandler } from 'react-native'
import Constants from 'expo-constants'
import { Session } from '@supabase/supabase-js'
import { useAuth } from '@repo/query/auth'
import { Message } from '@repo/const/message'

const ORIGIN = 'https://turborepo-kit.01.works/'

const INJECTED_CODE = `
  (function() {
    function wrap(fn) {
      return function wrapper() {
        var res = fn.apply(this, arguments);
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'NAVIGATION_STATE', value: null }));
        return res;
      }
    }

    history.pushState = wrap(history.pushState);
    history.replaceState = wrap(history.replaceState);
    window.addEventListener('popstate', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'NAVIGATION_STATE', value: null }));
    });
  })();

  true;
`

export default function SessionWebview({
  path,
  session,
}: {
  path: string
  session: Session | null
}) {
  const webviewRef = useRef<WebView | null>(null)
  const { logout } = useAuth()

  const [isCanGoBack, setIsCanGoBack] = useState(false)
  const onPressHardwareBackButton = () => {
    if (webviewRef.current && isCanGoBack) {
      webviewRef.current.goBack()
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressHardwareBackButton)
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        onPressHardwareBackButton,
      )
    }
  }, [isCanGoBack])

  return (
    <WebView
      ref={webviewRef}
      style={styles.container}
      bounces={false}
      source={{
        uri: `${ORIGIN}${path}`,
        headers: { 'Accept-Language': 'ko' },
      }}
      allowsBackForwardNavigationGestures={true}
      onMessage={({ nativeEvent: state }) => {
        console.log(state.data)

        const data = JSON.parse(state.data) as Message
        if (data.type === 'SIGNED_OUT') {
          logout()
        }

        if (data.type === 'NAVIGATION_STATE') {
          // Navigation state updated, can check state.canGoBack, etc.
          setIsCanGoBack(state.canGoBack)
        }
      }}
      onLoadStart={() => webviewRef.current?.injectJavaScript(INJECTED_CODE)}
      onLoadEnd={() => {
        if (session) {
          const { access_token, refresh_token } = session

          webviewRef.current?.postMessage(
            JSON.stringify({
              type: 'INITIAL_SESSION',
              value: { access_token, refresh_token },
            } as Message),
          )

          return
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
