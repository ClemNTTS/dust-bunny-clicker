export const LEVELS = [
  { threshold: 0, name: 'Tiny Dust Bunny', color: '#E5E5E5', size: 100, blur: 0 },
  { threshold: 1000, name: 'Static Cluster', color: '#CCCCCC', size: 140, blur: 2 },
  { threshold: 10000, name: 'Magnetic Fluff', color: '#999999', size: 180, blur: 5 },
  { threshold: 50000, name: 'Cosmic Lint', color: '#666666', size: 220, blur: 10 },
  { threshold: 250000, name: 'Matter Eater', color: '#333333', size: 260, blur: 20 },
  { threshold: 1000000, name: 'Event Horizon', color: '#111111', size: 300, blur: 40 },
  { threshold: 10000000, name: 'Black Hole', color: '#000000', size: 340, blur: 60 },
];

export const UPGRADES = [
  { id: 'brush', name: 'Fine Brush', baseCost: 15, power: 1, type: 'manual' },
  { id: 'magnet', name: 'Static Magnet', baseCost: 100, power: 5, type: 'manual' },
  { id: 'fan', name: 'Desk Fan', baseCost: 50, power: 1, type: 'auto' },
  { id: 'vacuum', name: 'Turbo Vacuum', baseCost: 500, power: 8, type: 'auto' },
  { id: 'vortex', name: 'Mini Vortex', baseCost: 2000, power: 45, type: 'auto' },
  { id: 'compressor', name: 'Quantum Squeeze', baseCost: 10000, power: 250, type: 'auto' },
  { id: 'singularity', name: 'Singularity Core', baseCost: 100000, power: 1500, type: 'auto' },
];

export const THEME = {
  background: '#0F172A',
  card: '#1E293B',
  primary: '#38BDF8',
  secondary: '#818CF8',
  accent: '#F472B6',
  text: '#F8FAFC',
  textMuted: '#94A3B8',
};
