import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface GoldenBunnyProps {
  onPress: () => void;
}

export const GoldenBunny: React.FC<GoldenBunnyProps> = ({ onPress }) => {
  const [visible, setVisible] = useState(false);
  const posX = useSharedValue(-100);
  const posY = useSharedValue(SCREEN_HEIGHT / 3);
  const rotation = useSharedValue(0);

  useEffect(() => {
    const spawnTimer = setInterval(() => {
      if (!visible && Math.random() < 0.1) {
        // 10% chance every 30s
        spawn();
      }
    }, 30000);

    return () => clearInterval(spawnTimer);
  }, [visible]);

  const spawn = () => {
    posX.value = -100;
    posY.value = Math.random() * (SCREEN_HEIGHT / 2) + 100;
    setVisible(true);

    rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1);

    posX.value = withTiming(SCREEN_WIDTH + 100, { duration: 5000 }, (finished) => {
      if (finished) runOnJS(setVisible)(false);
    });
  };

  const handlePress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onPress();
    setVisible(false);
    posX.value = -100;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    left: posX.value,
    top: posY.value,
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  if (!visible) return null;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      style={[styles.touchArea, { position: 'absolute', zIndex: 100 }]}
    >
      <Animated.View style={[styles.bunny, animatedStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bunny: {
    backgroundColor: '#FACC15',
    borderRadius: 25,
    elevation: 30,
    height: 50,
    shadowColor: '#FACC15',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    width: 50,
  },
  touchArea: {
    height: 100,
    width: 100,
  },
});
