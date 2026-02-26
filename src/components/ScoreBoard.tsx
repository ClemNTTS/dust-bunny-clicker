import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { THEME } from '../constants/game';
import { GameState } from '../hooks/useGameState';

interface ScoreBoardProps {
  state: GameState;
  levelName: string;
  progress: number;
  pps: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ state, levelName, progress, pps }) => {
  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progress * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.particles}>{Math.floor(state.particles).toLocaleString()}</Text>
      <Text style={styles.label}>Dust Particles</Text>

      <View style={styles.statsRow}>
        <Text style={styles.pps}>{pps.toLocaleString()} / sec</Text>
      </View>

      <View style={styles.levelContainer}>
        <View style={styles.levelHeader}>
          <Text style={styles.levelLabel}>Current Level</Text>
          <Text style={styles.levelName}>{levelName}</Text>
        </View>
        <View style={styles.progressBarBg}>
          <Animated.View style={[styles.progressBarFill, animatedProgressStyle]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
  label: {
    color: THEME.textMuted,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  levelContainer: {
    marginTop: 20,
    width: '100%',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  levelLabel: {
    color: THEME.textMuted,
    fontSize: 12,
  },
  levelName: {
    color: THEME.accent,
    fontSize: 12,
    fontWeight: 'bold',
  },
  particles: {
    color: THEME.text,
    fontSize: 56,
    fontWeight: '900',
  },
  pps: {
    color: THEME.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarBg: {
    backgroundColor: '#334155',
    borderRadius: 4,
    height: 8,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    backgroundColor: THEME.primary,
    height: '100%',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
