import { ReactNode, forwardRef } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  disable?: boolean
  color?: 'black' | 'white'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, disable, color = 'white' }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={`text-14 relative flex h-8 w-fit items-center justify-between gap-1 rounded-[8px] border border-grey-700 px-3 transition-colors disabled:cursor-not-allowed ${
          color === 'black'
            ? 'disabled:bg-gray-900 bg-[#000] text-white disabled:text-grey-100'
            : ' disabled:bg-gray-100 bg-white text-[#000] disabled:text-grey-900'
        }`}
        disabled={disable}
        onClick={onClick}
        whileTap={{
          scale: 0.95,
          opacity: 0.8,
        }}
      >
        <p>{children}</p>
      </motion.button>
    )
  },
)
