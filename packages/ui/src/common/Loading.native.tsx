import { AntDesign } from '@expo/vector-icons'
import { View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated'

export const Loading = () => {
  const spinValue = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${spinValue.value}deg` }],
    }
  })

  spinValue.value = withRepeat(
    withTiming(360, {
      duration: 1000,
      easing: Easing.linear,
    }),
    -1,
  )

  return (
    <View className="flex flex-1 items-center justify-center bg-black/30">
      <Animated.View style={[animatedStyle]}>
        <AntDesign name="loading1" size={24} color="black" />
      </Animated.View>
    </View>
  )
}
