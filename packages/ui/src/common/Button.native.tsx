import { Pressable, Text } from 'react-native'

interface ButtonProps {
  children: React.ReactNode
  onclick?: () => void
  disable?: boolean
  color?: 'black' | 'white'
}

export const Button = ({
  children,
  onclick,
  disable = false,
  color = 'white',
}: ButtonProps) => {
  return (
    <Pressable className="bg-black p-2" disabled={disable} onPress={onclick}>
      <Text className="bg-green text-[20px]">{children}</Text>
    </Pressable>
  )
}
