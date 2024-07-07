import { Reorder } from 'framer-motion'
import { FieldArrayWithId, useFormContext } from 'react-hook-form'
import { PostFormType } from './PostForm'
import { CloseIcon } from '@repo/ui/icon'
import { Badge } from '@repo/ui/Badge'
import { MusicType } from '../hooks/use-player'

export function MusicList({
  fields,
  setMusic,
  onReorder,
  remove,
}: {
  fields: FieldArrayWithId<PostFormType, 'music', 'id'>[]
  setMusic: (music: MusicType) => void
  onReorder: (value: number[]) => void
  remove: (index: number) => void
}) {
  const methods = useFormContext<PostFormType>()
  console.log(fields)

  return (
    <Reorder.Group
      className="flex flex-col"
      onReorder={onReorder}
      values={fields.map((el) => el.index)}
      as="ul"
      axis="y"
    >
      {fields.map((music, index) => {
        return (
          <Reorder.Item
            key={music.id}
            className="flex h-10 cursor-pointer items-center gap-2 hover:bg-zinc-100"
            onClick={() => {
              setMusic(music)
            }}
            value={music.index}
            as="li"
          >
            <div className="flex flex-1 items-center gap-2 transition hover:translate-x-[12px]">
              <Badge>{music.artist || '〇'}</Badge>
              <p className="text-sm">{music.title || '〇'}</p>
            </div>
            <div
              className="flex h-full basis-10 items-center justify-center opacity-50 transition hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                remove(index)
              }}
            >
              <CloseIcon />
            </div>
          </Reorder.Item>
        )
      })}
    </Reorder.Group>
  )
}
