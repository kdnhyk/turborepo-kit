import { ReactNode, forwardRef } from 'react'
import { Pressable, Text, View } from 'react-native'

interface ButtonProps {
  children?: ReactNode
  onclick?: () => void
  disable?: boolean
  color?: 'black' | 'white'
}

const Button = forwardRef<View, ButtonProps>(
  ({ children, onclick, disable = false, color = 'white' }, ref) => {
    return (
      <Pressable
        ref={ref}
        className="bg-black p-2"
        disabled={disable}
        onPress={onclick}
      >
        <Text className="bg-green text-[20px]">{children}</Text>
      </Pressable>
    )
  },
)

export { Button }
