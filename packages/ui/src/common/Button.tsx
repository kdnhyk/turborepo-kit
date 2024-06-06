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
      className={`text-14 relative flex h-8 w-fit items-center justify-between gap-1 rounded-[8px] border border-zinc-700 px-3 transition-colors disabled:cursor-not-allowed ${
        color === 'black'
          ? 'bg-[#000] text-white disabled:bg-zinc-700 disabled:text-zinc-100'
          : ' bg-white text-[#000] disabled:bg-zinc-100 disabled:text-zinc-700'
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
