import { useMemo, useState } from 'react';

export type QualityLevel = 'low' | 'medium' | 'high';

export interface QualityConfig {
  level: QualityLevel;
  dpr: number;
  particleCount: number;
  antialias: boolean;
  glowIntensity: number;
  enableVideo: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function detectDefaultQuality(): QualityLevel {
  if (typeof window === 'undefined') return 'medium';
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const lowCoreCount = (navigator.hardwareConcurrency ?? 4) <= 4;
  const lowMemory =
    'deviceMemory' in navigator &&
    ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4) <= 4;

  if (coarsePointer || lowCoreCount || lowMemory) return 'low';
  return 'medium';
}

const qualityPresets: Record<QualityLevel, Omit<QualityConfig, 'level'>> = {
  low: { dpr: 1, particleCount: 220, antialias: false, glowIntensity: 0.75, enableVideo: false },
  medium: { dpr: 1.3, particleCount: 520, antialias: true, glowIntensity: 1, enableVideo: true },
  high: { dpr: 1.6, particleCount: 860, antialias: true, glowIntensity: 1.2, enableVideo: true },
};

export function useQuality(defaultLevel?: QualityLevel) {
  const [level, setLevel] = useState<QualityLevel>(defaultLevel ?? detectDefaultQuality());

  const config = useMemo<QualityConfig>(() => {
    const preset = qualityPresets[level];
    const maxDpr = typeof window !== 'undefined' ? clamp(window.devicePixelRatio || 1, 1, 1.9) : 1.4;
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    const mobileCap = isMobile ? 1.4 : 1.9;

    return {
      level,
      ...preset,
      dpr: Math.min(preset.dpr, maxDpr, mobileCap),
    };
  }, [level]);

  return { quality: config, setQuality: setLevel };
}
