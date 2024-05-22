import React from 'react'
import { View, StyleSheet } from 'react-native'
import Auth from '@/components/Auth'
import { AppleAuth } from '@/components/auth/AppleAuth'
// import { GoogleAuth } from '@/components/auth/GoogleAuth'

export default function MypageScreen() {
  return (
    <View style={styles.container}>
      <Auth />
      <AppleAuth />
      {/* <GoogleAuth /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  button: {
    marginVertical: 10,
  },
})
