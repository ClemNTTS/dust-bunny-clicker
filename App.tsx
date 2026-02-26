import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { DustBunny } from './src/components/DustBunny';
import { ScoreBoard } from './src/components/ScoreBoard';
import { Shop } from './src/components/Shop';
import { THEME } from './src/constants/game';
import { useGameState } from './src/hooks/useGameState';

export default function App() {
  const { state, click, buyUpgrade, currentLevel, progress, pps, isLoaded } = useGameState();

  if (!isLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScoreBoard pps={pps} state={state} progress={progress} levelName={currentLevel.name} />

        <View style={styles.bunnyContainer}>
          <DustBunny color={currentLevel.color} onPress={click} size={currentLevel.size} />
        </View>

        <Shop onBuy={buyUpgrade} state={state} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  bunnyContainer: {
    alignItems: 'center',
    flex: 1.2,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: THEME.background,
    flex: 1,
  },
});
