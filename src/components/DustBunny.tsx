import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

interface DustBunnyProps {
  onPress: () => number;
  size: number;
  color: string;
}

interface FloatingText {
  id: number;
  value: number;
  x: number;
  y: number;
}

export const DustBunny: React.FC<DustBunnyProps> = ({ onPress, size, color }) => {
  const scale = useSharedValue(1);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: color,
    borderRadius: size / 2,
    height: size,
    transform: [{ scale: scale.value }],
    width: size,
  }));

  const removeText = (id: number) => {
    setFloatingTexts((prev) => prev.filter((t) => t.id !== id));
  };

  const handlePress = (event: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    scale.value = withSequence(withTiming(0.85, { duration: 50 }), withSpring(1));

    const power = onPress();

    // Add floating text
    const { locationX, locationY } = event.nativeEvent;
    const id = Date.now();
    setFloatingTexts((prev) => [...prev, { id, value: power, x: locationX, y: locationY }]);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handlePress} style={styles.touchArea}>
      <View style={styles.container}>
        <Animated.View style={[styles.bunny, animatedStyle]} />
        {floatingTexts.map((text) => (
          <FloatingNumber key={text.id} text={text} onComplete={() => removeText(text.id)} />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const FloatingNumber = ({ text, onComplete }: { text: FloatingText; onComplete: () => void }) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    translateY.value = withTiming(-100, { duration: 1000 });
    opacity.value = withTiming(0, { duration: 1000 }, (finished) => {
      if (finished) runOnJS(onComplete)();
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    left: text.x,
    opacity: opacity.value,
    position: 'absolute',
    top: text.y,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Text style={styles.floatingText}>+{text.value}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bunny: {
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  container: {
    alignItems: 'center',
    height: 400,
    justifyContent: 'center',
    width: '100%',
  },
  floatingText: {
    color: '#38BDF8',
    fontSize: 24,
    fontWeight: 'bold',
  },
  touchArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
