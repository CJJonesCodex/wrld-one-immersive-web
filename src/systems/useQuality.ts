import { useMemo, useState } from 'react';
import type { QualityLevel } from '../types/world';

export interface QualityConfig {
  level: QualityLevel;
  dpr: number;
  particles: number;
  orbs: number;
  ribbons: number;
  allowVideo: boolean;
  maxVideos: number;
  antialias: boolean;
}

const presets: Record<QualityLevel, Omit<QualityConfig, 'level'>> = {
  low: { dpr: 1, particles: 70, orbs: 5, ribbons: 3, allowVideo: false, maxVideos: 0, antialias: false },
  medium: { dpr: 1.5, particles: 150, orbs: 9, ribbons: 4, allowVideo: true, maxVideos: 1, antialias: true },
  high: { dpr: 2, particles: 260, orbs: 14, ribbons: 5, allowVideo: true, maxVideos: 2, antialias: true },
};

function detect(): QualityLevel {
  if (typeof window === 'undefined') return 'medium';
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  return coarse ? 'low' : 'medium';
}

export function useQuality() {
  const [level, setQuality] = useState<QualityLevel>(detect);
  const quality = useMemo<QualityConfig>(() => ({ level, ...presets[level] }), [level]);
  return { quality, setQuality };
}
