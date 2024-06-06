'use client'

import { useFormContext } from 'react-hook-form'

export const Textarea = ({
  field,
  placeholder,
  required,
  maxLength = 80,
  disabled,
}: {
  field: string
  placeholder: string
  required?: string
  maxLength?: number
  disabled?: boolean
}) => {
  const { register } = useFormContext()

  return (
    <textarea
      className="h-[160px] resize-y rounded-xl border px-3 py-2 disabled:bg-zinc-100 disabled:text-zinc-700"
      placeholder={placeholder}
      disabled={disabled}
      {...register(field, {
        required: required,
        maxLength: {
          value: maxLength,
          message: `${maxLength}자 이내로 입력해주세요`,
        },
      })}
    />
  )
}
