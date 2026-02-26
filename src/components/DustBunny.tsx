import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence, 
  withTiming 
} from 'react-native-reanimated';

interface DustBunnyProps {
  onPress: () => void;
  size: number;
  color: string;
}

export const DustBunny: React.FC<DustBunnyProps> = ({ onPress, size, color }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
    };
  });

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 50 }),
      withSpring(1)
    );
    onPress();
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handlePress}>
      <Animated.View style={[styles.bunny, animatedStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bunny: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
});
