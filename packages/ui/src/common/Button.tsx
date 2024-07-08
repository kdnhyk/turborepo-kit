'use client'

import { motion } from 'framer-motion'
import { VariantProps, cva } from '../utils/cva'
import { ClassName, cn } from '../utils/cn'

const ButtonVariants = cva(
  `flex items-center justify-center gap-1 transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80`,
  {
    variants: {
      variant: {
        default: 'w-fit',
        full: 'w-full',
      },
      shape: {
        square: 'rounded-none',
        round: 'rounded-full',
      },
      size: {
        small: 'h-6 px-2 py-1 text-xs sm:h-8 sm:px-3 sm:py-1 sm:text-sm',
        medium: 'h-8 px-3 py-1 text-sm sm:h-10 sm:px-6 sm:py-2 sm:text-base',
        large: 'h-10 px-6 py-2 text-base sm:h-12 sm:px-9 sm:py-3 sm:text-lg',
      },
      color: {
        white: 'border bg-white text-black',
        black: 'bg-black text-white',
        red: 'border border-red-600 bg-white text-red-600',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      shape: 'square',
      size: 'medium',
      color: 'white',
      weight: 'normal',
    },
  },
)

interface ButtonProps extends VariantProps<typeof ButtonVariants> {
  icon?: React.ReactNode
  children: React.ReactNode
  className?: ClassName
  onClick?: () => void
  disable?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  icon,
  children,
  className,
  onClick,
  disable,
  variant,
  shape,
  size,
  color,
  weight,
  type = 'button',
}: ButtonProps) => {
  return (
    <motion.button
      className={cn(
        ButtonVariants({ variant, shape, size, color, weight }),
        className,
      )}
      disabled={disable}
      onClick={onClick}
      initial={false}
      whileTap={{
        scale: 0.95,
        opacity: 0.8,
      }}
      type={type}
    >
      {icon && (
        <div className="flex basis-10 items-center justify-center">{icon}</div>
      )}

      <pre className="shrink-0">{children}</pre>

      {icon && <div />}
    </motion.button>
  )
}
