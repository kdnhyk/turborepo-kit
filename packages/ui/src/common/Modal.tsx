import { AnimatePresence, motion } from 'framer-motion'
import { CloseIcon } from '../icon'

export const Modal = ({
  close,
  children,
  visible = true,
}: {
  close: () => void
  children: React.ReactNode
  visible?: boolean
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/10"
          onClick={close}
          initial={false}
          animate={{
            opacity: 1,
          }}
        >
          <div
            className="flex min-w-[300px] flex-col rounded-xl border bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="baiss-12 flex justify-end border-b">
              <div
                className="flex aspect-square basis-10 items-center justify-center"
                onClick={close}
              >
                <CloseIcon />
              </div>
            </header>
            <div className="flex flex-col items-center p-3">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
