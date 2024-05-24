import React, { useEffect } from 'react'
import { View, StyleSheet, AppState } from 'react-native'
import Auth from '@/components/Auth'
import { AppleAuth } from '@/components/auth/AppleAuth'
import { supabase } from '@repo/supabase'
// import { GoogleAuth } from '@/components/auth/GoogleAuth'
import { useProfile } from '@repo/query/user'

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function MypageScreen() {
  const { profile } = useProfile()

  console.log(profile)

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
