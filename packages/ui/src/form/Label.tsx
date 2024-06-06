export const Label = ({
  children,
  ...props
}: {
  children?: React.ReactNode
}) => {
  return (
    <label className="" {...props}>
      {children}
    </label>
  )
}
