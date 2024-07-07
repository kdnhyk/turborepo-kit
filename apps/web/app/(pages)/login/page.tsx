'use client'

import Login from '@/_components/Login'
import { useUser } from '@repo/query/user'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  const user = useUser()

  if (user) redirect('/')

  return (
    <>
      <Login />
    </>
  )
}
