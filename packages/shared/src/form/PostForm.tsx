'use client'

import { PostMucisType, PostType } from '@repo/api/post'
import { usePostMutation } from '@repo/query/post'
import { Button } from '@repo/ui/Button'
import { ImageUploader } from '@repo/ui/ImageUploader'
import { Input } from '@repo/ui/Input'
import { Textarea } from '@repo/ui/Textarea'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Section } from '../layout/Section'
import { toast } from 'sonner'
import { Loading } from '@repo/ui/Loading'
import { Modal } from '@repo/ui/Modal'
import { MisicForm } from './MusicForm'
import { MusicList } from './MusicList'
import { useUser } from '@repo/query/user'
import { isTauri } from '../utils/env'
import { MusicType } from '../hooks/use-player'

export type PostFormType = Omit<PostType, 'image' | 'music'> & {
  image: File | string | null
  music: (PostMucisType & { id?: string })[]
  url: string
}
export function PostForm({ post }: { post?: PostType }) {
  const { data: user } = useUser()
  if (!user) return null

  const methods = useForm<PostFormType>({
    defaultValues: {
      ...post,
      url: '',
    },
  })
  const { fields, append, swap } = useFieldArray({
    control: methods.control,
    name: 'music',
  })
  const [editedMusic, setEditedMusic] = useState<MusicType | null>(null)
  const { insert, update } = usePostMutation()
  const { replace, refresh } = useRouter()

  console.log(fields)

  const onAdd = () => {
    const prev = fields.find((music) => music.url === methods.getValues('url'))
    setEditedMusic({
      url: methods.getValues('url'),
      artist: prev?.artist || '',
      title: prev?.title || '',
    })
  }

  const onSubmit = async (data: PostFormType) => {
    const { url, music: musicWithId, ...rest } = data

    console.log(rest)
    const music = musicWithId.map(({ id, ...data }) => data)

    if (!post) {
      insert.mutate({
        ...rest,
        user_id: user.id,
        image: rest.image as File,
        music,
      })
      return
    }

    update.mutate({ ...rest, id: post.id, user_id: user.id, music })
  }

  useEffect(() => {}, [])

  useEffect(() => {
    if (insert.isSuccess || update.isSuccess) {
      toast.success('Post saved')

      if (post && !isTauri) {
        const paths = ['/', `/post/${post.id}`, `/post/edit/${post.id}`]
        paths.forEach((path) =>
          fetch(`/api/revalidatePath?path=${path}`, { method: 'GET' })
            .then((res) => res.json())
            .then(console.log),
        )
      }

      const newPostId = insert.isSuccess ? insert.data?.id : update.data?.id
      replace(`/post/${newPostId}`)
      if (!isTauri) {
        refresh()
      }
    }
  }, [insert.isSuccess, update.isSuccess])

  return (
    <>
      <FormProvider {...methods}>
        <Section>
          <div className="flex items-end gap-2 sm:gap-4">
            <ImageUploader
              field="image"
              label="Image"
              bucket="post"
              size="medium"
            />
            <Button
              size="small"
              onClick={() => methods.setValue('image', null)}
            >
              Reset
            </Button>
          </div>
          <Input
            field="title"
            label="Title"
            placeholder="Title"
            required="Require"
            maxLength={100}
          />
          <Textarea field="content" label="Content" placeholder="Content" />
          <form>
            <Input
              field="url"
              label="Music"
              placeholder="URL"
              type="url"
              right={
                <Button
                  onClick={methods.handleSubmit(onAdd)}
                  color="black"
                  type="submit"
                >
                  Add
                </Button>
              }
            />
          </form>
          <MusicList
            setMusic={(music: MusicType) => setEditedMusic(music)}
            fields={fields}
            onReorder={(value: number[]) => {
              const prev = fields.map((el) => el.index)

              for (let i = 0; i < value.length; i++) {
                if (prev[i] !== value[i]) {
                  swap(i, i + 1)
                  break
                }
              }
            }}
            remove={(index: number) => {
              methods.setValue(
                'music',
                fields
                  .filter((_, i) => i !== index)
                  .map((music) =>
                    music.index > index
                      ? { ...music, index: music.index - 1 }
                      : music,
                  ),
              )
            }}
          />
          <div className="flex justify-end">
            <Button
              onClick={methods.handleSubmit(onSubmit)}
              color={methods.formState.isValid ? 'black' : 'white'}
              disable={insert.isPending}
            >
              Save
            </Button>
          </div>
        </Section>

        <Modal
          visible={editedMusic ? true : false}
          close={() => setEditedMusic(null)}
          variant="top"
        >
          {editedMusic && (
            <MisicForm
              music={editedMusic}
              append={(url: string, artist: string, title: string) => {
                if (fields.length >= 12) {
                  toast.error('You can add up to 12 music.')
                  return
                }
                const index = fields.length

                if (fields.find((music) => music.url === url)) {
                  methods.setValue(
                    'music',
                    fields.map((music) =>
                      url === music.url
                        ? {
                            id: music.id,
                            url,
                            title,
                            artist,
                            index,
                          }
                        : music,
                    ),
                  )
                } else {
                  append({
                    id: undefined,
                    index,
                    url,
                    artist,
                    title,
                  })
                }

                methods.setValue('url', '')
                setEditedMusic(null)
              }}
            />
          )}
        </Modal>
      </FormProvider>
      {(insert.isPending || update.isPending) && <Loading variant="fixed" />}
    </>
  )
}
