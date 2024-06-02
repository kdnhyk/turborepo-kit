'use client'

export const Label = ({
  children,
  ...props
}: {
  children?: React.ReactNode
}) => {
  return <label {...props}>{children}</label>
}
