'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useProfile, useProfileMutation } from '@repo/query/user'
import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import { ImageUploader } from '@repo/ui/imageUploader'
import { Label } from '@repo/ui/Label'
import { ErrorMessage } from '@repo/ui/ErrorMessage'

interface ProfileForm {
  user_id: string
  profile_image: File | string | null
  nickname: string
}
export default function ProfilePage() {
  const { data: profile } = useProfile()
  const { update } = useProfileMutation()
  const methods = useForm<ProfileForm>(
    profile ? { defaultValues: profile } : {},
  )

  const onSubmit = async (data: ProfileForm) => {
    console.log(data)

    update.mutate(data)
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <FormProvider {...methods}>
          <Label>UID</Label>
          <Input field="user_id" placeholder="uid" maxLength={40} disabled />
          <ErrorMessage field="user_id" />

          <Label>프로필 이미지</Label>
          <ImageUploader field="profile_image" />
          <ErrorMessage field="profile_image" />
          <Button onClick={() => methods.setValue('profile_image', null)}>
            초기화
          </Button>

          <Label>이름</Label>
          <Input
            field="nickname"
            placeholder="아름"
            maxLength={20}
            required="이름을 입력해주세요"
          />
          <ErrorMessage field="nickname" />

          <Button
            onClick={methods.handleSubmit(onSubmit)}
            color={methods.formState.isDirty ? 'black' : 'white'}
            disable={update.isPending}
          >
            저장
          </Button>
        </FormProvider>
      </div>
    </>
  )
}
