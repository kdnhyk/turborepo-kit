'use client'

import { useFormContext } from 'react-hook-form'
import { ErrorIcon } from '../icon'

export const ErrorMessage = ({ field, ...props }: { field: string }) => {
  const {
    formState: { errors },
  } = useFormContext()
  const message = errors?.[field]?.message?.toString()

  return (
    <div
      className={`flex items-center gap-0.5 ${message ? 'block' : 'hidden'}`}
      {...props}
    >
      <ErrorIcon />
      <p className={`text-xs text-[#ff5252]`}>{message}</p>
    </div>
  )
}
