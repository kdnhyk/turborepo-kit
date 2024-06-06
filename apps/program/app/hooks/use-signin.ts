import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'
import { open } from '@tauri-apps/api/shell'
import supabase from '@repo/supabase'
import { signInWithOAuth } from '@repo/api/auth'

function getLocalHostUrl(port: number) {
  return `http://localhost:${port}`
}

export default function useSignin() {
  const [isLoading, setIsLoading] = useState(false)
  const [port, setPort] = useState<number | null>(null)

  useEffect(() => {
    console.log('Refresh', port)
    if (port) return

    const unlisten = listen('oauth://url', (data) => {
      setPort(null)
      if (!data.payload) return

      const url = new URL(data.payload as string)
      const code = new URLSearchParams(url.search).get('code')

      console.log('here', data.payload, code)
      if (code) {
        supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
          if (error) {
            alert(error.message)
            console.error(error)
            return
          }
          location.reload()
        })
      }
    })

    let _port: number | null = null
    invoke('plugin:oauth|start').then(async (port) => {
      setPort(port as number)
      _port = port as number
    })
    ;() => {
      unlisten?.then((u) => u())
      invoke('plugin:oauth|cancel', { port: _port })
    }
  }, [port])

  const signinWithGoogle = async () => {
    setIsLoading(true)

    const { data, error } = await signInWithOAuth('google', {
      skipBrowserRedirect: true,
      redirectTo: getLocalHostUrl(port!),
    })

    if (data.url) {
      await open(data.url)
    } else {
      alert(error?.message)
    }
  }

  return { signinWithGoogle, isLoading }
}
