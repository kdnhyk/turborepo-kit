'use client'

import { useFormContext } from 'react-hook-form'

export const Input = ({
  field,
  placeholder,
  required,
  maxLength = 20,
  max,
  min,
  disabled,
}: {
  field: string
  placeholder: string
  required?: string
  maxLength?: number
  max?: number
  min?: number
  disabled?: boolean
}) => {
  const { register } = useFormContext()

  return (
    <input
      className="rounded-xl border px-3 py-2 disabled:bg-grey-100 disabled:text-grey-900"
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      {...register(field, {
        required: required,
        maxLength: {
          value: maxLength,
          message: `${maxLength}자 이내로 입력해주세요`,
        },
        min: min && {
          value: min,
          message: `${min} 이상으로 입력해주세요`,
        },
        max: max && {
          value: max,
          message: `${max} 이하로 입력해주세요`,
        },
      })}
    />
  )
}
