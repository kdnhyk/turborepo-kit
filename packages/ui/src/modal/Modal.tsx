'use client'

import { motion } from 'framer-motion'
import { VariantProps, cva } from 'class-variance-authority'
import { ClassName, cn } from '../utils/cn'
import { ModalBackground } from './atoms/Background'
import { ModalHeader } from './atoms/Header'

const ModalVariants = cva(`flex flex-col overflow-hidden border bg-white`, {
  variants: {
    variant: {
      default: 'max-h-full w-full sm:max-w-[400px]',
      top: 'absolute left-2 top-2 max-h-[calc(100%-16px)] max-h-[calc(100%-32px)] w-[calc(100%-16px)] overflow-y-auto sm:left-4 sm:top-4 sm:w-[calc(100%-32px)] xl:left-1/2 xl:left-[calc(50%-624px)] xl:w-[1248px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface ModalProps extends VariantProps<typeof ModalVariants> {
  children: React.ReactNode
  close: (() => void) | null
  visible?: boolean
  className?: ClassName
  title?: string
}

export const Modal = ({
  children,
  close,
  visible = true,
  variant,
  className,
  title,
}: ModalProps) => {
  return (
    <ModalBackground close={close} visible={visible}>
      <motion.div
        className={cn(ModalVariants({ variant }), className)}
        initial={{
          translateY: variant === 'top' ? '-100%' : '100%',
          opacity: 0,
        }}
        animate={{ translateY: '0%', opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(event) => event.stopPropagation()}
      >
        <ModalHeader close={close} title={title} />
        {children}
      </motion.div>
    </ModalBackground>
  )
}
