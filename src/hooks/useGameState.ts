import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { LEVELS, UPGRADES } from '../constants/game';

const STORAGE_KEY = '@dust_bunny_save_v2';

export interface GameState {
  particles: number;
  totalParticles: number;
  upgrades: Record<string, number>;
  lastTimestamp: number;
  prestigeLevel: number;
}

export const useGameState = () => {
  const [state, setState] = useState<GameState>({
    particles: 0,
    totalParticles: 0,
    upgrades: {},
    lastTimestamp: Date.now(),
    prestigeLevel: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-clicker PPS calculation
  const pps =
    UPGRADES.filter((u) => u.type === 'auto').reduce(
      (acc, u) => acc + (state.upgrades[u.id] || 0) * u.power,
      0,
    ) *
    (1 + state.prestigeLevel);

  // Load game and handle offline gains
  useEffect(() => {
    const loadGame = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const loadedState: GameState = JSON.parse(saved);
          const now = Date.now();
          const diffInSeconds = Math.floor((now - loadedState.lastTimestamp) / 1000);

          // Recalculate PPS for the loaded state to be accurate
          const loadedPPS =
            UPGRADES.filter((u) => u.type === 'auto').reduce(
              (acc, u) => acc + (loadedState.upgrades[u.id] || 0) * u.power,
              0,
            ) *
            (1 + loadedState.prestigeLevel);

          if (diffInSeconds > 60 && loadedPPS > 0) {
            const offlineGains = diffInSeconds * loadedPPS;
            const cappedGains = Math.min(offlineGains, loadedPPS * 3600 * 12); // Cap at 12 hours

            Alert.alert(
              'Welcome Back!',
              `Your vortex collected ${Math.floor(cappedGains).toLocaleString()} particles while you were gone.`,
            );

            setState({
              ...loadedState,
              particles: loadedState.particles + cappedGains,
              totalParticles: loadedState.totalParticles + cappedGains,
              lastTimestamp: now,
            });
          } else {
            setState({ ...loadedState, lastTimestamp: now });
          }
        }
      } catch (e) {
        console.error('Failed to load game', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadGame();
  }, []);

  // Save game periodically
  useEffect(() => {
    if (isLoaded) {
      const interval = setInterval(() => {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, lastTimestamp: Date.now() }));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [state, isLoaded]);

  const click = useCallback(() => {
    const brushPower = (state.upgrades['brush'] || 0) * 1;
    const magnetPower = (state.upgrades['magnet'] || 0) * 5;
    const multiplier = 1 + state.prestigeLevel;
    const clickPower = (1 + brushPower + magnetPower) * multiplier;

    setState((prev) => ({
      ...prev,
      particles: prev.particles + clickPower,
      totalParticles: prev.totalParticles + clickPower,
    }));

    return clickPower;
  }, [state.upgrades, state.prestigeLevel]);

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

  const triggerPrestige = useCallback(() => {
    setState((prev) => ({
      particles: 0,
      totalParticles: 0,
      upgrades: {},
      lastTimestamp: Date.now(),
      prestigeLevel: prev.prestigeLevel + 1,
    }));
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

        const totalAutoPower = autoPower * (1 + prev.prestigeLevel);

        return {
          ...prev,
          particles: prev.particles + totalAutoPower / 10, // Run 10 times per sec for smoothness
          totalParticles: prev.totalParticles + totalAutoPower / 10,
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

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

  // Absurd facts calculation
  const getAbsurdFact = () => {
    const total = state.totalParticles;
    if (total < 1000) return 'Lighter than a whisper.';
    if (total < 10000) return 'Heavier than a single snowflake.';
    if (total < 100000) return 'Mass equivalent to a medium pizza.';
    if (total < 1000000) return 'As dense as a small car.';
    if (total < 10000000) return 'Weighs more than a Boeing 747.';
    if (total < 100000000) return 'Heavier than the Great Pyramid of Giza.';
    return 'Currently distorting local space-time.';
  };

  return {
    buyUpgrade,
    click,
    currentLevel,
    isLoaded,
    nextLevel,
    pps,
    progress,
    state,
    absurdFact: getAbsurdFact(),
    triggerPrestige,
  };
};
