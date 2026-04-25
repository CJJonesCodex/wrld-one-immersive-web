import type { WorldId } from '../types/world';
import type { WorldRevealPreset } from '../types/reveal';

export const worldRevealPresets: Record<WorldId, WorldRevealPreset> = {
  'living-macro': {
    worldId: 'living-macro',
    breakStyle: 'dew-dissolve',
    timing: { start: 0.2, introEnd: 0.25, holdEnd: 0.31, breakEnd: 0.38, revealEnd: 0.44, exitStart: 0.5, end: 0.56 },
    titleExitDirection: 'depth',
    shardCount: { low: 18, medium: 32, high: 56 },
    worldObjectCount: { low: 18, medium: 36, high: 64 },
    mobileDensityScale: 0.55,
  },
  'signal-garden': {
    worldId: 'signal-garden',
    breakStyle: 'signal-slice',
    timing: { start: 0.32, introEnd: 0.36, holdEnd: 0.41, breakEnd: 0.48, revealEnd: 0.54, exitStart: 0.58, end: 0.64 },
    titleExitDirection: 'right',
    shardCount: { low: 16, medium: 28, high: 48 },
    worldObjectCount: { low: 20, medium: 42, high: 76 },
    mobileDensityScale: 0.55,
  },
  'core-chamber': {
    worldId: 'core-chamber',
    breakStyle: 'halo-collapse',
    timing: { start: 0.46, introEnd: 0.5, holdEnd: 0.55, breakEnd: 0.62, revealEnd: 0.68, exitStart: 0.7, end: 0.76 },
    titleExitDirection: 'radial',
    shardCount: { low: 14, medium: 24, high: 40 },
    worldObjectCount: { low: 12, medium: 26, high: 48 },
    mobileDensityScale: 0.6,
  },
  'aurora-passage': {
    worldId: 'aurora-passage',
    breakStyle: 'ribbon-smear',
    timing: { start: 0.6, introEnd: 0.64, holdEnd: 0.69, breakEnd: 0.76, revealEnd: 0.82, exitStart: 0.84, end: 0.9 },
    titleExitDirection: 'left',
    shardCount: { low: 12, medium: 22, high: 36 },
    worldObjectCount: { low: 8, medium: 18, high: 34 },
    mobileDensityScale: 0.55,
  },
  'rift-bloom': {
    worldId: 'rift-bloom',
    breakStyle: 'petal-aperture',
    timing: { start: 0.74, introEnd: 0.78, holdEnd: 0.83, breakEnd: 0.9, revealEnd: 0.96, exitStart: 0.97, end: 1 },
    titleExitDirection: 'radial',
    shardCount: { low: 12, medium: 24, high: 40 },
    worldObjectCount: { low: 8, medium: 16, high: 28 },
    mobileDensityScale: 0.6,
  },
  'future-world': {
    worldId: 'future-world',
    breakStyle: 'constellation-deconstruct',
    timing: { start: 0.86, introEnd: 0.89, holdEnd: 0.92, breakEnd: 0.96, revealEnd: 1, exitStart: 1, end: 1 },
    titleExitDirection: 'depth',
    shardCount: { low: 20, medium: 38, high: 70 },
    worldObjectCount: { low: 24, medium: 48, high: 86 },
    mobileDensityScale: 0.55,
  },
};

export function getWorldRevealPreset(worldId: WorldId): WorldRevealPreset {
  return worldRevealPresets[worldId];
}
