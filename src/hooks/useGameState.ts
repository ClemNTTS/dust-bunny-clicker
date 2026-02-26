import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    setState((prev) => {
      const clickPower = 1 + (prev.upgrades['brush'] || 0) * 1;
      return {
        ...prev,
        particles: prev.particles + clickPower,
        totalParticles: prev.totalParticles + clickPower,
      };
    });
  }, []);

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

  const currentLevel =
    LEVELS.slice()
      .reverse()
      .find((l) => state.totalParticles >= l.threshold) || LEVELS[0];

  return {
    state,
    click,
    buyUpgrade,
    currentLevel,
    isLoaded,
  };
};
