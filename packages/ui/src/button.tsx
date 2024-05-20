import { motion } from 'framer-motion'

const Button = ({
  icon,
  children,
  onClick,
  disable,
  color = 'white',
}: {
  icon?: React.ReactNode
  children: React.ReactNode
  onClick: () => void
  disable?: boolean
  color?: 'black' | 'white'
}) => {
  return (
    <motion.button
      className={`text-14 relative flex h-8 w-fit items-center justify-between gap-1 rounded-[8px] border border-grey-700 px-3 transition-colors disabled:cursor-not-allowed disabled:bg-white disabled:text-grey-900 ${color === 'black' ? 'bg-[#000] text-white' : 'bg-white text-[#000]'}`}
      disabled={disable}
      onClick={onClick}
      whileTap={{
        scale: 0.95,
        opacity: 0.8,
      }}
    >
      {icon && <div className="flex items-center justify-center">{icon}</div>}

      <p>{children}</p>

      {icon && <div />}
    </motion.button>
  )
}

export { Button }
