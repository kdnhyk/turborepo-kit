'use client'

import { useFormContext } from 'react-hook-form'
import { Container } from './atoms/Container'
import { Label } from './atoms/Label'
import { ErrorMessage } from './atoms/ErrorMessage'
import { url } from './atoms/pattern'

interface InputProps {
  field: string
  label?: string
  placeholder: string
  required?: string
  disabled?: boolean
  right?: React.ReactNode
  type?: 'text' | 'url'
  maxLength?: number
}

export const Input = ({
  field,
  label,
  placeholder,
  required,
  disabled,
  right,
  type = 'text',
  maxLength = 255,
}: InputProps) => {
  const { register } = useFormContext()

  return (
    <Container>
      {label && <Label optional={!required}>{label}</Label>}
      <div className="flex items-center gap-2">
        <input
          className="h-8 min-w-0 flex-1 border px-3 py-2 disabled:bg-zinc-100 disabled:text-zinc-700 sm:h-10"
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register(field, {
            required: required,
            ...(type === 'url' && {
              pattern: {
                value: url,
                message: 'Invalid URL format',
              },
            }),
            maxLength: {
              value: maxLength,
              message: `Must be less than ${maxLength} characters`,
            },
          })}
        />
        {right}
      </div>
      <ErrorMessage field={field} />
    </Container>
  )
}
