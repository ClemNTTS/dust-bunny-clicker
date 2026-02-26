import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

  // On limite la taille pour qu'elle ne dépasse jamais 80% de la largeur de l'écran
  const responsiveSize = Math.min(size, SCREEN_WIDTH * 0.8);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: color,
    borderRadius: responsiveSize / 2,
    height: responsiveSize,
    transform: [{ scale: scale.value }],
    width: responsiveSize,
  }));

  const removeText = (id: number) => {
    setFloatingTexts((prev) => prev.filter((t) => t.id !== id));
  };

  const handlePress = (event: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    scale.value = withSequence(withTiming(0.85, { duration: 50 }), withSpring(1));

    const power = onPress();
    const { locationX, locationY } = event.nativeEvent;
    const id = Date.now();
    setFloatingTexts((prev) => [...prev, { id, value: power, x: locationX, y: locationY }]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={handlePress} style={styles.touchArea}>
        <Animated.View style={[styles.bunny, animatedStyle]} />
      </TouchableOpacity>
      {floatingTexts.map((text) => (
        <FloatingNumber key={text.id} text={text} onComplete={() => removeText(text.id)} />
      ))}
    </View>
  );
};

const FloatingNumber = ({ text, onComplete }: { text: FloatingText; onComplete: () => void }) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    translateY.value = withTiming(-120, { duration: 800 });
    opacity.value = withTiming(0, { duration: 800 }, (finished) => {
      if (finished) runOnJS(onComplete)();
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    left: text.x,
    opacity: opacity.value,
    position: 'absolute',
    top: text.y - 50,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle} pointerEvents="none">
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
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  floatingText: {
    color: '#38BDF8',
    fontSize: 28,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  touchArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
