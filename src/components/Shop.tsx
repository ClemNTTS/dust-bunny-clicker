import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';

import { THEME, UPGRADES } from '../constants/game';
import { GameState } from '../hooks/useGameState';

interface ShopProps {
  onBuy: (id: string) => void;
  state: GameState;
}

export const Shop: React.FC<ShopProps> = ({ state, onBuy }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Cosmic Upgrades</Text>
      {UPGRADES.map((u) => {
        const count = state.upgrades[u.id] || 0;
        const cost = Math.floor(u.baseCost * Math.pow(1.15, count));
        const canAfford = state.particles >= cost;

        return (
          <TouchableOpacity
            key={u.id}
            disabled={!canAfford}
            onPress={() => onBuy(u.id)}
            style={[styles.card, !canAfford && styles.disabled]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.info}>
                <Text style={styles.name}>{u.name}</Text>
                <Text style={styles.power}>
                  {u.type === 'manual' ? `+${u.power} / click` : `+${u.power} / sec`}
                </Text>
              </View>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{count}</Text>
              </View>
            </View>
            <View style={styles.priceRow}>
              <Text
                style={[styles.price, canAfford ? styles.priceAffordable : styles.priceExpensive]}
              >
                {cost.toLocaleString()} Particles
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.card,
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    elevation: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { height: -10, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  countBadge: {
    alignItems: 'center',
    backgroundColor: THEME.primary,
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    width: 36,
  },
  countText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.5,
  },
  info: {
    flex: 1,
  },
  name: {
    color: THEME.text,
    fontSize: 18,
    fontWeight: '700',
  },
  power: {
    color: THEME.textMuted,
    fontSize: 14,
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  priceAffordable: {
    color: '#4ADE80',
  },
  priceExpensive: {
    color: '#F87171',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    color: THEME.text,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
  },
});
