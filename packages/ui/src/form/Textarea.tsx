'use client'

import { useFormContext } from 'react-hook-form'
import { Container } from './atoms/Container'
import { Label } from './atoms/Label'
import { ErrorMessage } from './atoms/ErrorMessage'

interface TextareaProps {
  field: string
  label?: string
  placeholder: string
  required?: string
  maxLength?: number
  disabled?: boolean
}

export const Textarea = ({
  field,
  label,
  placeholder,
  required,
  maxLength = 80,
  disabled,
}: TextareaProps) => {
  const { register } = useFormContext()

  return (
    <Container>
      {label && <Label optional={!required}>{label}</Label>}
      <textarea
        className="h-[160px] resize-y border px-3 py-2 disabled:bg-zinc-100 disabled:text-zinc-700"
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
      <ErrorMessage field={field} />
    </Container>
  )
}
