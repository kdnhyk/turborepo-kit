import PostForm from '@/(components)/form/PostForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '글 작성',
  description: 'description',
}

export default async function NewPage() {
  return (
    <>
      <PostForm />
    </>
  )
}
