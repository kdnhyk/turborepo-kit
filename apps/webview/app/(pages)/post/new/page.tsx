'use client'

import Header from '@/(components)/common/Header'
import PostForm from '@/(components)/form/PostForm'
import useSession from '@/hooks/use-session'
import { useProfileSelf } from '@repo/query/user'
import { Loading } from '@repo/ui/Loading'

export default function NewPage() {
  const { session } = useSession()
  const { data: profile } = useProfileSelf()

  return (
    <>
      <Header title="글 작성" />
      {!session || !profile ? <Loading /> : <PostForm />}
    </>
  )
}
