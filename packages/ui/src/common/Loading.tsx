import { VariantProps, cva } from 'class-variance-authority'
import { ClassName, cn } from '../utils/cn'

const LoadingVariants = cva(``, {
  variants: {
    variant: {
      default: 'flex flex-1 items-center justify-center',
      fixed: 'fixed inset-0 flex items-center justify-center bg-white/30',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface LoadingProps extends VariantProps<typeof LoadingVariants> {
  className?: ClassName
}

export const Loading = ({ variant, className }: LoadingProps) => {
  return (
    <div className={cn(LoadingVariants({ variant }), className)}>
      <div className="w-fit">
        <svg
          width="44"
          height="66"
          viewBox="0 0 44 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="animate-dash"
            d="M2 0V16H18V32H2H34C34 32 34 41.7516 34 48M34 48C29.5817 48 26 51.5817 26 56C26 60.4183 29.5817 64 34 64C38.4183 64 42 60.4183 42 56C42 51.5817 38.4183 48 34 48Z"
            stroke="black"
            stroke-width="4"
            strokeDasharray={100}
            pathLength={100}
          />
        </svg>
      </div>
    </div>
  )
}
