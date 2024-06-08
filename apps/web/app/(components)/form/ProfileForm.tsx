'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useProfileSelf, useProfileMutation } from '@repo/query/user'
import { Button } from '@repo/ui/Button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { InputWrapper } from '@repo/ui/InputWrapper'
import { Label } from '@repo/ui/Label'
import { ImageUploader } from '@repo/ui/ImageUploader'
import { ErrorMessage } from '@repo/ui/ErrorMessage'
import { Input } from '@repo/ui/Input'

interface FormType {
  user_id: string
  profile_image: File | string | null
  nickname: string
}
export default function ProfileForm() {
  const { data: profile } = useProfileSelf()
  const { update } = useProfileMutation()
  const methods = useForm<FormType>({
    defaultValues:
      { ...profile, profile_image: `profile/${profile?.profile_image}` } ||
      undefined,
  })
  const { back } = useRouter()

  const onSubmit = async (data: FormType) => {
    console.log(data)

    update.mutate(data)
  }

  useEffect(() => {
    if (update.isSuccess) {
      back()
    }
  }, [update.isSuccess])

  return (
    <div className="flex flex-col gap-3 p-3">
      <FormProvider {...methods}>
        <InputWrapper>
          <Label>프로필 이미지</Label>
          <div className="flex items-end gap-3">
            <ImageUploader field="profile_image" />

            <Button
              onClick={() =>
                methods.setValue('profile_image', null, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            >
              초기화
            </Button>
          </div>
          <ErrorMessage field="profile_image" />
        </InputWrapper>

        <InputWrapper>
          <Label>이름</Label>
          <Input
            field="nickname"
            placeholder="아름"
            maxLength={20}
            required="이름을 입력해주세요"
          />
          <ErrorMessage field="nickname" />
        </InputWrapper>

        <div className="flex justify-end">
          <Button
            onClick={methods.handleSubmit(onSubmit)}
            color={methods.formState.isDirty ? 'black' : 'white'}
            disable={update.isPending}
          >
            {update.isPending ? '저장 중...' : '저장'}
          </Button>
        </div>
      </FormProvider>
    </div>
  )
}
