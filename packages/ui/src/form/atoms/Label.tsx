export interface LabelProps {
  children: React.ReactNode
  optional?: boolean
  basis?: number
}

export const Label = ({ children, optional = false, basis }: LabelProps) => {
  return (
    <label
      className="flex shrink-0 items-start gap-0.5 text-sm sm:text-base"
      style={{
        flexBasis: basis,
      }}
    >
      <span>{children}</span>
      {!optional && (
        <span className="text-xs leading-none text-[#ff4949]">*</span>
      )}
    </label>
  )
}
