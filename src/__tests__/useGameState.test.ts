import { renderHook, act } from '@testing-library/react-native';
import { useGameState } from '../hooks/useGameState';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

describe('useGameState', () => {
  it('should initialize with 0 particles', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.state.particles).toBe(0);
  });

  it('should increase particles when clicking', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.click();
    });
    expect(result.current.state.particles).toBeGreaterThan(0);
  });
});
