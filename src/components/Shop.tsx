import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { UPGRADES } from '../constants/game';
import { GameState } from '../hooks/useGameState';

interface ShopProps {
  state: GameState;
  onBuy: (id: string) => void;
}

export const Shop: React.FC<ShopProps> = ({ state, onBuy }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Upgrades</Text>
      {UPGRADES.map((u) => {
        const count = state.upgrades[u.id] || 0;
        const cost = Math.floor(u.baseCost * Math.pow(1.15, count));
        const canAfford = state.particles >= cost;

        return (
          <TouchableOpacity 
            key={u.id} 
            onPress={() => onBuy(u.id)}
            disabled={!canAfford}
            style={[styles.item, !canAfford && styles.disabled]}
          >
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{u.name}</Text>
              <Text style={styles.itemDesc}>
                {u.type === 'manual' ? `+${u.power} per click` : `+${u.power} per sec`}
              </Text>
            </View>
            <View style={styles.itemBuy}>
              <Text style={styles.itemCount}>{count}</Text>
              <Text style={[styles.itemCost, canAfford ? styles.canAfford : styles.cannotAfford]}>
                {cost.toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    marginTop: 40,
  },
  content: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  disabled: {
    opacity: 0.5,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemDesc: {
    fontSize: 14,
    color: '#999',
  },
  itemBuy: {
    alignItems: 'flex-end',
  },
  itemCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  itemCost: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  canAfford: {
    color: '#4CAF50',
  },
  cannotAfford: {
    color: '#F44336',
  },
});
