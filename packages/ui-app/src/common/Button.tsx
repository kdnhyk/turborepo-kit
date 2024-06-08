import { Pressable, Text, StyleSheet } from 'react-native'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disable?: boolean
  color?: 'black' | 'white'
}

export const Button = ({
  children,
  onClick,
  disable = false,
  color = 'white',
}: ButtonProps) => {
  return (
    <Pressable
      style={color === 'white' ? styles.button_white : styles.button_black}
      disabled={disable}
      onPress={onClick}
    >
      <Text style={color === 'white' ? styles.text_white : styles.text_black}>
        {children}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button_white: {
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  button_black: {
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'black',
    borderWidth: 1,
  },
  text_white: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  text_black: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
})
