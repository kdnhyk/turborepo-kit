import { ClassName, cn } from '@repo/ui/cn'

export function Section({
  children,
  className,
}: {
  children: React.ReactNode
  className?: ClassName
}) {
  return (
    <section
      className={cn(
        'flex flex-1 flex-col gap-2 border bg-white p-2 sm:gap-4 sm:p-4',
        className,
      )}
    >
      {children}
    </section>
  )
}
