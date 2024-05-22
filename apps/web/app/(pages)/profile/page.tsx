'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '@repo/ui/Input'
import { useProfile } from '@repo/query/user'
import { Button } from '@repo/ui/Button'

const ProfilePage = () => {
  const methods = useForm()
  const { profile } = useProfile()
  console.log(methods.formState.isValid)

  return (
    <FormProvider {...methods}>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
        <Input.Container>
          <Input.Label>UID</Input.Label>
          <Input.Content
            field="user_id"
            maxLength={40}
            defaultValue={profile.data?.user_id}
            disabled
          />
        </Input.Container>
        <Input.Container>
          <Input.Label>이름</Input.Label>
          <Input.Content
            field="nickname"
            placeholder="Required"
            maxLength={20}
            defaultValue={profile.data?.nickname}
            required
          />
        </Input.Container>

        <Button
          onClick={() => {
            alert('Do it yourself 😉')
          }}
          color="black"
          disable={!methods.formState.isValid}
        >
          저장
        </Button>
      </div>
    </FormProvider>
  )
}

export default ProfilePage
