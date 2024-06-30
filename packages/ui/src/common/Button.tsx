'use client'

import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disable?: boolean
  color?: 'black' | 'white'
}

export const Button = ({
  children,
  onClick,
  disable,
  color = 'white',
}: ButtonProps) => {
  return (
    <motion.button
      className={`relative flex h-8 w-fit items-center rounded-[8px] border border-zinc-700 px-3 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        color === 'black' ? 'bg-[#000] text-white' : ' bg-white text-[#000]'
      }`}
      disabled={disable}
      onClick={onClick}
      initial={false}
      whileTap={{
        scale: 0.95,
        opacity: 0.8,
      }}
    >
      <p>{children}</p>
    </motion.button>
  )
}
