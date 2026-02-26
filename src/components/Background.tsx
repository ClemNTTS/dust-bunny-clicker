import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

interface BackgroundProps {
  progress: number;
}

export const Background: React.FC<BackgroundProps> = ({ progress }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress,
      [0, 0.2, 0.5, 0.8, 1],
      ['#1E293B', '#0F172A', '#020617', '#000000', '#000000'],
    );

    return {
      backgroundColor: withTiming(backgroundColor, { duration: 1000 }),
    };
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
      {/* Optional: Add stars or dust particles here */}
      <View style={styles.vignette} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
