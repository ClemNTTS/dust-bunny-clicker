import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

import { LEVELS, UPGRADES } from '../constants/game';

const STORAGE_KEY = '@dust_bunny_save';

export interface GameState {
  particles: number;
  totalParticles: number;
  upgrades: Record<string, number>;
}

export const useGameState = () => {
  const [state, setState] = useState<GameState>({
    particles: 0,
    totalParticles: 0,
    upgrades: {},
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load game
  useEffect(() => {
    const loadGame = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setState(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Failed to load game', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadGame();
  }, []);

  // Save game
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const click = useCallback(() => {
    const brushPower = (state.upgrades['brush'] || 0) * 1;
    const magnetPower = (state.upgrades['magnet'] || 0) * 5;
    const clickPower = 1 + brushPower + magnetPower;

    setState((prev) => ({
      ...prev,
      particles: prev.particles + clickPower,
      totalParticles: prev.totalParticles + clickPower,
    }));

    return clickPower;
  }, [state.upgrades]);

  const buyUpgrade = useCallback((upgradeId: string) => {
    const upgrade = UPGRADES.find((u) => u.id === upgradeId);
    if (!upgrade) return;

    setState((prev) => {
      const currentCount = prev.upgrades[upgradeId] || 0;
      const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, currentCount));

      if (prev.particles >= cost) {
        return {
          ...prev,
          particles: prev.particles - cost,
          upgrades: {
            ...prev.upgrades,
            [upgradeId]: currentCount + 1,
          },
        };
      }
      return prev;
    });
  }, []);

  // Auto-clicker loop
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        let autoPower = 0;
        UPGRADES.filter((u) => u.type === 'auto').forEach((u) => {
          autoPower += (prev.upgrades[u.id] || 0) * u.power;
        });

        if (autoPower === 0) return prev;

        return {
          ...prev,
          particles: prev.particles + autoPower,
          totalParticles: prev.totalParticles + autoPower,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pps = UPGRADES.filter((u) => u.type === 'auto').reduce(
    (acc, u) => acc + (state.upgrades[u.id] || 0) * u.power,
    0,
  );

  const levelIndex =
    LEVELS.slice()
      .reverse()
      .findIndex((l) => state.totalParticles >= l.threshold) !== -1
      ? LEVELS.length -
        1 -
        LEVELS.slice()
          .reverse()
          .findIndex((l) => state.totalParticles >= l.threshold)
      : 0;

  const currentLevel = LEVELS[levelIndex];
  const nextLevel = LEVELS[levelIndex + 1];

  const progress = nextLevel
    ? (state.totalParticles - currentLevel.threshold) /
      (nextLevel.threshold - currentLevel.threshold)
    : 1;

  return {
    buyUpgrade,
    click,
    currentLevel,
    isLoaded,
    nextLevel,
    pps,
    progress,
    state,
  };
};
