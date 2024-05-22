import { Tabs } from 'expo-router'
import React, { useEffect, useState } from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@repo/api/supabase'
import { useProfile } from '@repo/query/user'

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const [session, setSession] = useState<Session | null>(null)
  const { profile } = useProfile()

  console.log(session)
  console.log(profile)

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'code-slash' : 'code-slash-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="webview"
        options={{
          title: 'Webview',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'tv' : 'tv-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: 'Mypage',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'man' : 'man-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
