'use client'

import Login from '@/_components/Login'
import { Modal } from '@repo/ui/Modal'
import { useRouter } from 'next/navigation'

export default function LoginModal() {
  const { back } = useRouter()

  return (
    <Modal close={back} title="LOGIN">
      <Login />
    </Modal>
  )
}
