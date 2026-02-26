import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GameState } from '../hooks/useGameState';

interface ScoreBoardProps {
  state: GameState;
  levelName: string;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ state, levelName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.particles}>{Math.floor(state.particles).toLocaleString()}</Text>
      <Text style={styles.label}>Dust Particles</Text>
      <View style={styles.levelBadge}>
        <Text style={styles.levelText}>{levelName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
  },
  label: {
    color: '#666',
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  levelBadge: {
    backgroundColor: '#333',
    borderRadius: 20,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  particles: {
    color: '#333',
    fontSize: 48,
    fontWeight: '800',
  },
});
