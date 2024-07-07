'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Loading } from '../common/Loading'
import { toCompressImage } from '@repo/utils/image'
import Image from 'next/image'
import { Container } from './atoms/Container'
import { Label } from './atoms/Label'
import { ErrorMessage } from './atoms/ErrorMessage'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../utils/cn'

const ImageUploaderVariants = cva(
  `relative flex shrink-0 items-center justify-center overflow-hidden border border-black cursor-pointer`,
  {
    variants: {
      shape: {
        square: 'rounded-none',
        'rounded-full': 'rounded-full',
      },
      size: {
        small: 'h-20 w-20',
        medium: 'h-32 w-32',
        large: 'h-40 w-40',
      },
    },
    defaultVariants: {
      shape: 'square',
      size: 'small',
    },
  },
)

interface ImageUploaderProps
  extends VariantProps<typeof ImageUploaderVariants> {
  field: string
  label?: string
  bucket: string
  required?: string
  disabled?: boolean
  className?: string
}

export const ImageUploader = ({
  field,
  label,
  bucket,
  required,
  disabled,
  shape,
  size,
  className,
}: ImageUploaderProps) => {
  const { register, setValue, watch } = useFormContext()
  const value = watch(field) as File | string | null

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    try {
      if (event.target.files && event.target.files.length > 0) {
        const files = Array.from(event.target.files)

        const result = await Promise.all(
          files.map((file) => toCompressImage(file)),
        )

        const dataUrl = await readFileAsDataURL(result[0]!)
        setPreview(dataUrl)
        setValue(field, result[0], {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
    } catch (error) {
      console.error('Failed to read file', error)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!value) {
      setPreview(null)
      inputRef.current?.value && (inputRef.current.value = '')
    }
  }, [value])

  return (
    <Container>
      {label && <Label optional={!required}>{label}</Label>}
      <div
        className={cn(
          ImageUploaderVariants({ shape, size }),
          disabled && 'cursor-not-allowed',
          className,
        )}
        onClick={(event) => {
          event.stopPropagation()
          if (!disabled) {
            inputRef.current?.click()
          }
        }}
      >
        {loading ? (
          <Loading />
        ) : preview ? (
          <img
            className="h-full w-full overflow-hidden object-cover"
            src={preview}
            alt={`Preview`}
          />
        ) : value && typeof value === 'string' ? (
          <Image
            className="h-full w-full overflow-hidden object-cover"
            src={`${bucket}/${value}`}
            alt={`Default Image`}
            width={80}
            height={80}
          />
        ) : (
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0L160 160M160 0L0 160" stroke="black" />
          </svg>
        )}

        <input
          type="file"
          accept="image/*"
          hidden
          {...register(field, { required })}
          ref={inputRef}
          onChange={handleFileChange}
        />
      </div>
      <ErrorMessage field={field} />
    </Container>
  )
}

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
