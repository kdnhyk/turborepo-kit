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

export type PostFormType = Omit<PostType, 'image' | 'music'> & {
  image: File | string | null
  music: PostMucisType[]
  url: string
  musicTitle: string
  artist: string
}
export function PostForm({ post }: { post?: PostType }) {
  const { data: user } = useUser()
  if (!user) return null

  const methods = useForm<PostFormType>({
    defaultValues: {
      ...post,
      url: '',
      musicTitle: '',
      artist: '',
    },
  })
  const { fields, append, swap, remove } = useFieldArray({
    control: methods.control,
    name: 'music',
  })
  const [url, setUrl] = useState<string | null>(null)
  const { insert, update } = usePostMutation()
  const { push } = useRouter()

  console.log(fields)

  const onSubmit = async (data: PostFormType) => {
    const { url, musicTitle, artist, ...rest } = data

    if (!post) {
      insert.mutate({ ...rest, user_id: user.id, image: rest.image as File })
      return
    }

    update.mutate({ ...rest, id: post.id, user_id: user.id })
  }

  useEffect(() => {
    methods.setFocus('title')
  }, [])

  useEffect(() => {
    if (insert.isSuccess || update.isSuccess) {
      toast.success('Post saved')
      push('/')
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
          />
          <Textarea field="content" label="Content" placeholder="Content" />
          <Input
            field="url"
            label="Music"
            placeholder="URL"
            right={
              <Button
                onClick={() => {
                  setUrl(methods.getValues('url'))
                  methods.setValue('url', '')
                }}
                color="black"
              >
                Add
              </Button>
            }
          />
          <MusicList
            setUrl={(url: string) => setUrl(url)}
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
            remove={(index: number) => remove(index)}
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
          visible={url ? true : false}
          close={() => setUrl(null)}
          variant="top"
        >
          {url && (
            <MisicForm
              url={url}
              append={() => {
                if (fields.length >= 12) {
                  toast.error('You can add up to 12 music.')
                  return
                }
                if (fields.find((music) => music.url === url)) {
                  methods.setValue(
                    'music',
                    fields.map((music) =>
                      music.url === url
                        ? {
                            ...music,
                            artist: methods.getValues('artist'),
                            title: methods.getValues('musicTitle'),
                          }
                        : music,
                    ),
                  )
                } else {
                  append({
                    index: fields.length,
                    url,
                    artist: methods.getValues('artist'),
                    title: methods.getValues('musicTitle'),
                  })
                }

                methods.setValue('musicTitle', '')
                methods.setValue('artist', '')
                setUrl(null)
              }}
            />
          )}
        </Modal>
      </FormProvider>
      {(insert.isPending || update.isPending) && <Loading variant="fixed" />}
    </>
  )
}
