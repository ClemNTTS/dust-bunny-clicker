import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useGameState } from './src/hooks/useGameState';
import { ScoreBoard } from './src/components/ScoreBoard';
import { DustBunny } from './src/components/DustBunny';
import { Shop } from './src/components/Shop';

export default function App() {
  const { state, click, buyUpgrade, currentLevel, isLoaded } = useGameState();

  if (!isLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScoreBoard state={state} levelName={currentLevel.name} />

        <View style={styles.bunnyContainer}>
          <DustBunny onPress={click} size={currentLevel.size} color={currentLevel.color} />
        </View>

        <Shop state={state} onBuy={buyUpgrade} />
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
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
});
