'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Loading } from '../common/Loading'
import { toCompressImage } from '@repo/utils/image'
import Image from 'next/image'

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

interface ImageUploaderProps {
  field: string
  required?: string
  disabled?: boolean
}

export const ImageUploader = ({ field, required, disabled }: ImageUploaderProps) => {
  const { register, setValue, watch } = useFormContext()
  const value = watch(field) as File | string | null

  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files)
      try {
        const result = await Promise.all(
          files.map((file) => toCompressImage(file)),
        )

        const dataUrl = await readFileAsDataURL(result[0]!)
        setPreview(dataUrl)
        setValue(field, result[0])
      } catch (error) {
        console.error('Failed to read file', error)
      }
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
    <div
      className={`relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[4px] border border-black bg-grey-100 ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={() => (!disabled ? inputRef.current?.click() : null)}
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
          src={value}
          alt={`Default Image`}
          width={80}
          height={80}
        />
      ) : (
        <svg
          width="82"
          height="82"
          viewBox="0 0 82 82"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L81 81M81 1L1 81" stroke="black" />
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
  )
}

