'use client'

// import Login from '@/_components/Login'
import { Modal } from '@repo/ui/Modal'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

const Login = dynamic(() => import('@/_components/Login'), { ssr: false })

export default function LoginModal() {
  const { back } = useRouter()

  return (
    <Modal close={back} title="LOGIN">
      <Login />
    </Modal>
  )
}
