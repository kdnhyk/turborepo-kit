import HeaderButton from './HeaderButton'

export const Page = {
  Layout: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4">
        {children}
      </div>
    )
  },

  Header: ({ title }: { title: string }) => {
    return (
      <header className="text-18 flex shrink-0 basis-12 items-center border-b bg-white">
        <HeaderButton />

        <p>{title}</p>
      </header>
    )
  },
}
