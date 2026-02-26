import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { THEME } from '../constants/game';
import { GameState } from '../hooks/useGameState';

interface ScoreBoardProps {
  state: GameState;
  levelName: string;
  progress: number;
  pps: number;
  absurdFact: string;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  state,
  levelName,
  progress,
  pps,
  absurdFact,
}) => {
  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progress * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.particles}>{Math.floor(state.particles).toLocaleString()}</Text>
        <Text style={styles.label}>Dust Particles</Text>
      </View>

      <View style={styles.statsRow}>
        <Text style={styles.pps}>{pps.toLocaleString()} / sec</Text>
        {state.prestigeLevel > 0 && (
          <Text style={styles.prestige}>Mult: x{state.prestigeLevel + 1}</Text>
        )}
      </View>

      <Text style={styles.absurdFact}>{absurdFact}</Text>

      <View style={styles.levelContainer}>
        <View style={styles.levelHeader}>
          <Text style={styles.levelLabel}>Rank</Text>
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
  absurdFact: {
    color: THEME.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    marginTop: 10,
    padding: 20,
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
  },
  label: {
    color: THEME.textMuted,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  levelContainer: {
    marginTop: 15,
    width: '100%',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
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
    fontSize: 48,
    fontWeight: '900',
  },
  pps: {
    color: THEME.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  prestige: {
    color: THEME.accent,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  progressBarBg: {
    backgroundColor: '#334155',
    borderRadius: 4,
    height: 6,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    backgroundColor: THEME.primary,
    height: '100%',
  },
  statsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
});
