'use client'

import ReactPlayer from 'react-player'
import { Input } from '@repo/ui/Input'
import { Button } from '@repo/ui/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { MusicType } from '../hooks/use-player'
import { useState } from 'react'
import { Loading } from '@repo/ui/Loading'

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
  const [isLoading, setIsLoading] = useState(true)
  const methods = useForm<MusicFormType>({
    defaultValues: {
      url: music.url,
      artist: music.artist,
      title: music.title,
    },
  })

  const onConfirm = (data: MusicFormType) => {
    const { url, artist, title } = data

    append(url, artist, title)
  }
  console.log(methods.formState.errors)

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center [&>*]:w-full">
        <div className="relative flex justify-center">
          <ReactPlayer
            url={methods.watch('url')}
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
              setIsLoading(false)
              methods.clearErrors('url')
              if (music.title) return
              // Youtube, Soundcloud
              const internalPlayer = player?.getInternalPlayer()
              console.log(internalPlayer)
              const title =
                typeof internalPlayer?.videoTitle === 'string'
                  ? internalPlayer?.videoTitle
                  : typeof internalPlayer?.at === 'function'
                    ? internalPlayer?.at(0)?.title
                    : ''

              methods.setValue('title', title)
            }}
            onError={() => {
              console.log('Error..')

              methods.setError(
                'url',
                { type: 'validate', message: 'Invalid URL' },
                { shouldFocus: true },
              )
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {isLoading && <Loading />}
          </div>
        </div>
        <form className="flex flex-col gap-3 border-t border-dashed p-3">
          <Input
            field="url"
            label="URL"
            placeholder="URL"
            disabled={isLoading}
          />
          <Input
            field="artist"
            label="Artist"
            placeholder="Artist"
            maxLength={100}
          />
          <Input
            field="title"
            label="Title"
            placeholder="Title"
            disabled={isLoading}
            required="Please enter the title of the music"
            maxLength={100}
          />
          <div className="flex justify-end">
            <Button
              onClick={methods.handleSubmit(onConfirm)}
              color="black"
              disable={isLoading || methods.formState.errors.url ? true : false}
              type="submit"
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}
