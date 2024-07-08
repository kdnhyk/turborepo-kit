import { VariantProps, cva } from 'class-variance-authority'
import { ClassName, cn } from '../utils/cn'

const BadgeVariants = cva(`rounded-full border bg-white text-zinc-700`, {
  variants: {
    variant: {
      default: 'border-dashed',
      solid: 'border-solid',
    },
    shape: {
      default: 'rounded-full',
      square: 'rounded-none',
    },
    size: {
      small: 'px-2 py-[1px] text-xs sm:px-3 sm:py-[2px] sm:text-sm',
      medium: 'px-3 py-[2px] text-sm sm:px-4 sm:py-1 sm:text-base',
    },
    color: {
      white: 'border-grey-700 border bg-white text-black',
      black: 'bg-black text-white',
      red: 'text-red border-grey-700 border bg-white',
    },
    transform: {
      normal: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
    },
  },
  defaultVariants: {
    variant: 'default',
    shape: 'default',
    size: 'small',
    color: 'white',
    transform: 'normal',
  },
})

interface BadgeProps extends VariantProps<typeof BadgeVariants> {
  children: React.ReactNode
  className?: ClassName
}

export const Badge = ({
  children,
  variant,
  shape,
  size,
  transform,
  className,
}: BadgeProps) => {
  return (
    <div
      className={cn(
        BadgeVariants({ variant, shape, size, transform }),
        className,
      )}
    >
      <p>{children}</p>
    </div>
  )
}
