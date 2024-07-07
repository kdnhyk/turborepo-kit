'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

type ModalBackgroundProps = {
  children: React.ReactNode
  close: (() => void) | null
  visible: boolean
}
export const ModalBackground = ({
  children,
  close,
  visible,
}: ModalBackgroundProps) => {
  useEffect(() => {
    if (visible) {
      window.document.body.style.overflow = 'hidden'
    }

    return () => {
      window.document.body.style.overflow = 'auto'
    }
  }, [visible])

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-40 flex items-end justify-center bg-black/20 opacity-0 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              event.preventDefault()
              if (close) close()
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
