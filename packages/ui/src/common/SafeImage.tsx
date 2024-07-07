'use client'

import Image, { ImageProps } from 'next/image'
import { useAnimate } from 'framer-motion'
import { cn } from '../utils/cn'

interface SafeImageProps extends ImageProps {
  className?: string
  src: string
  opacity?: boolean
}

export const SafeImage = ({
  className,
  src,
  opacity,
  ...rest
}: SafeImageProps) => {
  const [scope, animate] = useAnimate()

  return (
    <Image
      {...rest}
      ref={scope}
      src={src}
      className={cn(opacity && 'opacity-0', className)}
      onError={() =>
        animate(scope.current, { opacity: 0, transition: { duration: 0 } })
      }
      onLoad={() => animate(scope.current, { opacity: 1 })}
    />
  )
}
