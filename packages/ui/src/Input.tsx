import { useFormContext } from 'react-hook-form'

const ErrorMessage = ({ message }: { message: string | undefined }) => {
  return (
    <div
      className={`flex items-center gap-0.5 ${message ? 'block' : 'hidden'}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 10.9744C8.11624 10.9744 8.21368 10.9351 8.29232 10.8564C8.37094 10.7778 8.41025 10.6803 8.41025 10.5641C8.41025 10.4479 8.37094 10.3504 8.29232 10.2718C8.21368 10.1932 8.11624 10.1539 8 10.1539C7.88376 10.1539 7.78632 10.1932 7.70768 10.2718C7.62906 10.3504 7.58975 10.4479 7.58975 10.5641C7.58975 10.6803 7.62906 10.7778 7.70768 10.8564C7.78632 10.9351 7.88376 10.9744 8 10.9744ZM7.66667 8.76923H8.33333V4.76923H7.66667V8.76923ZM8.00223 14C7.17253 14 6.39248 13.8426 5.66207 13.5277C4.93166 13.2128 4.29629 12.7855 3.75598 12.2457C3.21568 11.7059 2.78794 11.0711 2.47277 10.3414C2.15759 9.61163 2 8.83192 2 8.00223C2 7.17253 2.15744 6.39248 2.47232 5.66207C2.78721 4.93166 3.21455 4.29629 3.75435 3.75598C4.29415 3.21568 4.92891 2.78794 5.65863 2.47277C6.38837 2.15759 7.16808 2 7.99777 2C8.82747 2 9.60752 2.15744 10.3379 2.47232C11.0683 2.78721 11.7037 3.21455 12.244 3.75435C12.7843 4.29415 13.2121 4.92891 13.5272 5.65863C13.8424 6.38837 14 7.16808 14 7.99777C14 8.82747 13.8426 9.60752 13.5277 10.3379C13.2128 11.0683 12.7855 11.7037 12.2457 12.244C11.7059 12.7843 11.0711 13.2121 10.3414 13.5272C9.61163 13.8424 8.83192 14 8.00223 14ZM8 13.3333C9.48889 13.3333 10.75 12.8167 11.7833 11.7833C12.8167 10.75 13.3333 9.48889 13.3333 8C13.3333 6.51111 12.8167 5.25 11.7833 4.21667C10.75 3.18333 9.48889 2.66667 8 2.66667C6.51111 2.66667 5.25 3.18333 4.21667 4.21667C3.18333 5.25 2.66667 6.51111 2.66667 8C2.66667 9.48889 3.18333 10.75 4.21667 11.7833C5.25 12.8167 6.51111 13.3333 8 13.3333Z"
          fill="#FF6161"
        />
      </svg>
      <p className={`text-12 text-[#ff5252]`}>{message}</p>
    </div>
  )
}

export const Input = {
  Container: ({
    children,
    row,
  }: {
    children: React.ReactNode
    row?: boolean
  }) => {
    return (
      <div
        className={`flex gap-2 ${!row ? 'flex-col' : 'h-fit min-h-[40px] flex-row justify-between'}`}
      >
        {children}
      </div>
    )
  },

  Label: ({
    children,
    optional,
    basis,
  }: {
    children: React.ReactNode
    optional?: boolean
    basis?: number
  }) => {
    return (
      <label
        className="text-14 flex items-center"
        style={{
          flexBasis: basis,
        }}
      >
        {children}
        {optional && <span className="text-grey-900">(선택)</span>}
      </label>
    )
  },

  /**
   * type = 'text' | 'number', type이 number일 경우 min, max 필수
   * @returns
   */
  Content: ({
    field,
    icon,
    placeholder,
    defaultValue,
    required,
    type = 'text',
    maxLength = 20,
    max,
    min,
    disabled,
  }: {
    field: string
    icon?: React.ReactNode
    placeholder: string
    defaultValue?: string
    required?: string
    type?: 'text' | 'number'
    maxLength?: number
    max?: number
    min?: number
    disabled?: boolean
  }) => {
    const {
      register,
      formState: { errors },
    } = useFormContext()
    const message = errors?.[field]?.message?.toString()

    return (
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-1 basis-10 rounded-[4px] border border-grey-700 bg-white">
          {icon && (
            <div className="flex h-full shrink-0 basis-10 items-center justify-center">
              {icon}
            </div>
          )}

          <input
            className="text-14 w-full rounded-[4px] px-3 disabled:text-grey-900"
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={disabled}
            {...register(field, {
              required: required,
              maxLength: {
                value: maxLength,
                message: `${maxLength}자 이내로 입력해주세요`,
              },
              ...(type === 'number' && {
                min: {
                  value: min !== undefined ? min : '',
                  message: `${min} 이상으로 입력해주세요`,
                },
                max: {
                  value: max !== undefined ? max : '',
                  message: `${max} 이하로 입력해주세요`,
                },
              }),
              validate: (value) => {
                if (type === 'number' && !/^\d+$/.test(value)) {
                  return '숫자만 입력해주세요'
                }
              },
            })}
          />
        </div>

        <ErrorMessage message={message} />
      </div>
    )
  },

  ContentArea: ({
    field,
    placeholder,
    defaultValue,
    required,
    maxLength = 100,
    disabled,
  }: {
    field: string
    placeholder: string
    defaultValue?: string
    required?: string
    maxLength?: number
    disabled?: boolean
  }) => {
    const {
      register,
      formState: { errors },
    } = useFormContext()
    const message = errors?.[field]?.message?.toString()

    return (
      <>
        <div className="flex gap-1 rounded-[4px] border border-grey-700 bg-white">
          <textarea
            className="text-14 min-h-[120px] flex-1 rounded-[4px] px-3 py-2"
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={disabled}
            {...register(field, {
              required: required,
              maxLength: {
                value: maxLength,
                message: `${maxLength}자 이내로 입력해주세요`,
              },
            })}
          />
        </div>

        <ErrorMessage message={message} />
      </>
    )
  },

  Description: ({ children }: { children: React.ReactNode }) => {
    return <p className="text-12 text-grey-900">{children}</p>
  },
}
