import { CloseIcon } from '../../icon'

type ModalHeaderProps = {
  close: (() => void) | null
  title?: string
}
export const ModalHeader = ({ close, title }: ModalHeaderProps) => {
  return (
    <div className="flex shrink-0 basis-10 items-center justify-between border-b border-dashed">
      {close && (
        <div
          className="flex h-full basis-10 cursor-pointer items-center justify-center transition hover:bg-zinc-100"
          onClick={close}
        >
          <CloseIcon />
        </div>
      )}
      {title && <p className="text-14">{title}</p>}

      <div className="basis-10" />
    </div>
  )
}
