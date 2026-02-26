import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Background } from './src/components/Background';
import { DustBunny } from './src/components/DustBunny';
import { GoldenBunny } from './src/components/GoldenBunny';
import { ScoreBoard } from './src/components/ScoreBoard';
import { Shop } from './src/components/Shop';
import { THEME, LEVELS } from './src/constants/game';
import { useGameState } from './src/hooks/useGameState';

export default function App() {
  const {
    state,
    click,
    buyUpgrade,
    currentLevel,
    progress,
    pps,
    isLoaded,
    absurdFact,
    triggerPrestige,
  } = useGameState();

  if (!isLoaded) return null;

  const isMaxLevel = currentLevel.name === LEVELS[LEVELS.length - 1].name;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Background progress={state.totalParticles / 10000000} />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <ScoreBoard
          pps={pps}
          state={state}
          progress={progress}
          levelName={currentLevel.name}
          absurdFact={absurdFact}
        />

        <View style={styles.bunnyContainer}>
          <DustBunny color={currentLevel.color} onPress={click} size={currentLevel.size} />
        </View>

        <GoldenBunny
          onPress={() => {
            // Bonus click power for 30 seconds logic could go here,
            // for now just a huge particle burst
            for (let i = 0; i < 50; i++) click();
          }}
        />

        <View style={styles.shopContainer}>
          <Shop
            onBuy={buyUpgrade}
            onPrestige={triggerPrestige}
            state={state}
            isMaxLevel={isMaxLevel}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  bunnyContainer: {
    alignItems: 'center',
    flex: 3,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  shopContainer: {
    flex: 2,
  },
});
