'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '@repo/ui/Input'
import { useProfile } from '@repo/query/user'
import { Button } from '@repo/ui/Button'
import { Page } from '@/(components)/layout/Page'

const ProfilePage = () => {
  const methods = useForm()
  const { profile } = useProfile()
  console.log(methods.formState.isValid)

  return (
    <>
      <Page.Header title="프로필" />
      <Page.Layout>
        <FormProvider {...methods}>
          <Input.Container>
            <Input.Label>UID</Input.Label>
            <Input.Content
              field="user_id"
              placeholder="uid"
              maxLength={40}
              defaultValue={profile.data?.user_id}
              disabled
            />
          </Input.Container>
          <Input.Container>
            <Input.Label>이름</Input.Label>
            <Input.Content
              field="nickname"
              placeholder="아름"
              maxLength={20}
              defaultValue={profile.data?.nickname}
              required="이름을 입력해주세요"
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
        </FormProvider>
      </Page.Layout>
    </>
  )
}

export default ProfilePage
