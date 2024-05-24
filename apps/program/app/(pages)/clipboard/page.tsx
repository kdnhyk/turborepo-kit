'use client'

import { useEffect, useState } from 'react'
import { Page } from '@/(components)/layout/Page'
import { readText, writeText } from '@tauri-apps/api/clipboard'
import { Button } from '@repo/ui/Button'

export default function ClipboardPage() {
  const [clipboard, setClipboard] = useState('')

  useEffect(() => {
    const setClipboardText = async () => {
      const clipboardText = await readText()

      setClipboard(clipboardText || '')
    }

    const timer = setInterval(async () => {
      await setClipboardText()
    }, 1000)

    setClipboardText()

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <Page.Header title="greet" />
      <Page.Layout>
        <Button
          onClick={async () => {
            await writeText('Tauri is awesome!')
          }}
        >
          카피
        </Button>
        <p>{clipboard}</p>
      </Page.Layout>
    </>
  )
}
