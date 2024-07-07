'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useProfileSelf, useProfileMutation } from '@repo/query/user'
import { Button } from '@repo/ui/Button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ImageUploader } from '@repo/ui/ImageUploader'
import { Input } from '@repo/ui/Input'
import { Section } from '../layout/Section'
import { toast } from 'sonner'
import { Loading } from '@repo/ui/Loading'

interface FormType {
  user_id: string
  profile_image: File | string | null
  nickname: string
}
export function ProfileForm() {
  const { data: profile } = useProfileSelf()
  if (!profile) return null

  const { update } = useProfileMutation()
  const methods = useForm<FormType>({
    defaultValues: profile,
  })
  const [isEdit, setIsEdit] = useState(false)
  const { back } = useRouter()

  const onSubmit = async (data: FormType) => {
    console.log(data)

    update.mutate({ ...data, user_id: profile.user_id })
  }

  useEffect(() => {
    if (update.isSuccess) {
      toast.success('Profile updated')
      back()
    }
  }, [update.isSuccess])

  return (
    <>
      <Section>
        <FormProvider {...methods}>
          <div className="flex items-end">
            <ImageUploader
              field="profile_image"
              bucket="profile"
              label="Profile Image"
              shape="rounded-full"
              disabled={!isEdit}
            />
            {isEdit && (
              <Button
                onClick={() =>
                  methods.setValue('profile_image', null, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                size="small"
              >
                Reset
              </Button>
            )}
          </div>
          <Input
            field="nickname"
            label="Nickname"
            placeholder="Nickname"
            required="Please enter your nickname"
            disabled={!isEdit}
          />

          <div className="flex justify-end gap-2 sm:gap-4">
            {!isEdit ? (
              <Button
                onClick={() => setIsEdit(true)}
                color="black"
                disable={update.isPending}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setIsEdit(false)
                    methods.reset()
                  }}
                  color="white"
                  disable={update.isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={methods.handleSubmit(onSubmit)}
                  color="black"
                  disable={update.isPending}
                >
                  Save
                </Button>
              </>
            )}
          </div>
        </FormProvider>
      </Section>
      {update.isPending && <Loading variant="fixed" />}
    </>
  )
}
