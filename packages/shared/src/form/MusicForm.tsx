'use client'

import ReactPlayer from 'react-player'
import { Input } from '@repo/ui/Input'
import { Button } from '@repo/ui/Button'

export function MisicForm({
  url,
  append,
}: {
  url: string
  append?: () => void
}) {
  return (
    <div className="flex flex-col items-center [&>*]:w-full">
      <div className="flex justify-center">
        <ReactPlayer
          url={url}
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
              options: { auto_play: true },
            },
          }}
        />
      </div>
      <div className="flex flex-col gap-3 border-t border-dashed p-3">
        <Input field="artist" label="Artist" placeholder="Artist" />
        <Input field="musicTitle" label="Title" placeholder="Title" />
        <div className="flex justify-end">
          <Button onClick={append} color="black">
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
