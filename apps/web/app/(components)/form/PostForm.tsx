'use client'

import { usePostMutation } from '@repo/query/post'
import { Button } from '@repo/ui/Button'
import { Input } from '@repo/ui/Input'
import { Label } from '@repo/ui/Label'
import { Textarea } from '@repo/ui/Textarea'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface FormType {
  title: string
  content: string
}
export default function PostForm({
  defaultValues,
}: {
  defaultValues?: FormType & { id: number }
}) {
  const methods = useForm<FormType>({ defaultValues })
  const { post, update } = usePostMutation()
  const { push } = useRouter()

  const onSubmit = async (data: FormType) => {
    console.log(data)

    if (!defaultValues) {
      post.mutate(data)
      return
    }

    update.mutate({ ...data, id: defaultValues.id })
  }

  useEffect(() => {
    methods.setFocus('title')
  }, [methods.setFocus])

  useEffect(() => {
    if (post.isSuccess || update.isSuccess) {
      push('/')
    }
  }, [post.isSuccess, update.isSuccess])

  return (
    <div className="flex flex-1 flex-col gap-2 p-3">
      <FormProvider {...methods}>
        <Label>Title</Label>
        <Input field="title" placeholder="Title" />

        <Label>Content</Label>
        <Textarea field="content" placeholder="Content" />

        <div className="flex justify-end">
          <Button
            onClick={methods.handleSubmit(onSubmit)}
            color={methods.formState.isValid ? 'black' : 'white'}
            disable={post.isPending}
          >
            Save
          </Button>
        </div>
      </FormProvider>
    </div>
  )
}
