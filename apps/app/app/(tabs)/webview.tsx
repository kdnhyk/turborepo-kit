import React from 'react'
import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { WebView } from 'react-native-webview'

export default function WebviewScreen() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://expo.dev' }}
      allowsBackForwardNavigationGestures={true}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
})
