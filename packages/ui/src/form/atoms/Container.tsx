export interface ContainerProps {
  children: React.ReactNode
  row?: boolean
}

export const Container = ({ children, row = false }: ContainerProps) => {
  return (
    <div
      className={`flex gap-2 ${row ? 'flex-row flex-wrap items-center justify-end' : 'flex-col'}`}
    >
      {children}
    </div>
  )
}
