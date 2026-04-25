import type { WorldId } from '../types/world';

export type WorldVfxPresetId =
  | 'organic-dew'
  | 'signal-garden'
  | 'core-halo'
  | 'aurora-ribbon'
  | 'rift-bloom'
  | 'future-constellation';

export interface WorldVfxPreset {
  worldId: WorldId;
  presetId: WorldVfxPresetId;
  titleLines: [string, string];
  eyebrow: string;
  microcopy: string;
  primary: string;
  secondary: string;
  accent: string;
  backgroundA: string;
  backgroundB: string;
  motionWords: string[];
}

export type VfxPreset = WorldVfxPreset;

export const worldVfxPresets: Record<WorldId, WorldVfxPreset> = {
  'living-macro': {
    worldId: 'living-macro',
    presetId: 'organic-dew',
    titleLines: ['LIVING', 'MACRO'],
    eyebrow: '01 / LIVING MEDIA TEST',
    microcopy: 'Dew, moss, and quiet motion.',
    primary: '#12351f',
    secondary: '#56d987',
    accent: '#ffd166',
    backgroundA: '#eafbea',
    backgroundB: '#fff8ec',
    motionWords: ['dew shimmer', 'soft spores', 'organic drift'],
  },
  'signal-garden': {
    worldId: 'signal-garden',
    presetId: 'signal-garden',
    titleLines: ['SIGNAL', 'GARDEN'],
    eyebrow: '02 / SPATIAL SYSTEM',
    microcopy: 'Clean pulses moving through glass flora.',
    primary: '#062f42',
    secondary: '#54d8ff',
    accent: '#fffdf7',
    backgroundA: '#dff7ff',
    backgroundB: '#fffdf7',
    motionWords: ['node pulse', 'scan sweep', 'signal bloom'],
  },
  'core-chamber': {
    worldId: 'core-chamber',
    presetId: 'core-halo',
    titleLines: ['CORE', 'CHAMBER'],
    eyebrow: '03 / ENGINE ROOM',
    microcopy: 'A calm center for future world logic.',
    primary: '#21133f',
    secondary: '#a78bfa',
    accent: '#ffd166',
    backgroundA: '#f6e9ff',
    backgroundB: '#fff8ec',
    motionWords: ['halo rings', 'quiet orbit', 'memory core'],
  },
  'aurora-passage': {
    worldId: 'aurora-passage',
    presetId: 'aurora-ribbon',
    titleLines: ['AURORA', 'PASSAGE'],
    eyebrow: '04 / MOTION STUDY',
    microcopy: 'Color ribbons carrying the camera forward.',
    primary: '#3f1327',
    secondary: '#ff7a66',
    accent: '#a78bfa',
    backgroundA: '#ffe7dc',
    backgroundB: '#f6e9ff',
    motionWords: ['ribbon wave', 'soft acceleration', 'chromatic drift'],
  },
  'rift-bloom': {
    worldId: 'rift-bloom',
    presetId: 'rift-bloom',
    titleLines: ['RIFT', 'BLOOM'],
    eyebrow: '05 / PORTAL STUDY',
    microcopy: 'A luminous aperture opening into the next world.',
    primary: '#3a2600',
    secondary: '#ffd166',
    accent: '#54d8ff',
    backgroundA: '#fff8ec',
    backgroundB: '#dff7ff',
    motionWords: ['petal aperture', 'pearl bloom', 'arrival flare'],
  },
  'future-world': {
    worldId: 'future-world',
    presetId: 'future-constellation',
    titleLines: ['FUTURE', 'WORLD'],
    eyebrow: '06 / EXPANSION SLOT',
    microcopy: 'An open coordinate for the next world drop.',
    primary: '#172419',
    secondary: '#7cffb2',
    accent: '#fffdf7',
    backgroundA: '#fffdf7',
    backgroundB: '#eafbea',
    motionWords: ['constellation draw', 'blueprint dots', 'open field'],
  },
};

export const getWorldVfxPreset = (worldId: WorldId): WorldVfxPreset => worldVfxPresets[worldId];
