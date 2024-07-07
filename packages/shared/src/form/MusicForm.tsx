'use client'

import ReactPlayer from 'react-player'
import { Input } from '@repo/ui/Input'
import { Button } from '@repo/ui/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { MusicType } from '../hooks/use-player'
import { useState } from 'react'

type MusicFormType = {
  url: string
  title: string
  artist: string
}

export function MisicForm({
  music,
  append,
}: {
  music: MusicType
  append: (url: string, artist: string, title: string) => void
}) {
  const [ok, setOk] = useState(false)
  const [error, setError] = useState(false)
  const methods = useForm<MusicFormType>({
    defaultValues: {
      url: music.url,
      artist: music.artist,
      title: music.title,
    },
  })

  const onConfirm = (data: MusicFormType) => {
    console.log(data)
    const { url, artist, title } = data

    append(url, artist, title)
  }

  console.log(ok)

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center [&>*]:w-full">
        <div className="flex justify-center">
          <ReactPlayer
            url={music.url}
            style={{
              width: '100%',
              borderWidth: '0px 1px',
              borderStyle: 'dashed',
            }}
            config={{
              youtube: {
                playerVars: { showinfo: 0, controls: 0, modestbranding: 0 },
              },
              soundcloud: {
                options: { auto_play: false },
              },
            }}
            onReady={(player) => {
              setOk(true)
              // Youtube, Soundcloud
              const internalPlayer = player?.getInternalPlayer('dash')
              console.log(internalPlayer)
              const title =
                typeof internalPlayer?.videoTitle === 'string'
                  ? internalPlayer?.videoTitle
                  : typeof internalPlayer?.at === 'function'
                    ? internalPlayer?.at(0)?.title
                    : ''

              methods.setValue('title', title)
            }}
            onError={() => setError(true)}
          />
        </div>
        <div className="flex flex-col gap-3 border-t border-dashed p-3">
          <Input
            field="url"
            label="URL"
            placeholder="URL"
            disabled={ok && !error}
          />
          <Input field="artist" label="Artist" placeholder="Artist" />
          <Input
            field="title"
            label="Title"
            placeholder="Title"
            disabled={!ok}
            required="Please enter the title of the music"
          />
          <div className="flex justify-end">
            <Button
              onClick={methods.handleSubmit(onConfirm)}
              color="black"
              disable={!ok || error}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
