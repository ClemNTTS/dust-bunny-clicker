export const LEVELS = [
  { threshold: 0, name: 'Tiny Dust Bunny', color: '#E5E5E5', size: 100 },
  { threshold: 1000, name: 'Giant Fluff', color: '#CCCCCC', size: 150 },
  { threshold: 10000, name: 'Cloud of Chaos', color: '#999999', size: 200 },
  { threshold: 100000, name: 'Singularity', color: '#333333', size: 250 },
  { threshold: 1000000, name: 'Black Hole', color: '#000000', size: 300 },
];

export const UPGRADES = [
  { id: 'brush', name: 'Soft Brush', baseCost: 10, power: 1, type: 'manual' },
  { id: 'fan', name: 'Electric Fan', baseCost: 50, power: 1, type: 'auto' },
  { id: 'vacuum', name: 'Vacuum Cleaner', baseCost: 250, power: 5, type: 'auto' },
  { id: 'cyclone', name: 'Industrial Cyclone', baseCost: 1000, power: 25, type: 'auto' },
  { id: 'vortex', name: 'Space Vortex', baseCost: 5000, power: 100, type: 'auto' },
];
