import { useMemo } from 'react';
import type { WorldRevealRuntime } from '../types/reveal';
import type { FeaturedWorld } from '../types/world';
import { clamp01, smoothstep } from '../utils/math';

interface UseSectionRevealRuntimeArgs {
  activeWorld: FeaturedWorld;
  sectionProgress: number;
}

function normalize(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp01((value - start) / (end - start));
}

export function getSectionRevealRuntime(activeWorld: FeaturedWorld, sectionProgress: number): WorldRevealRuntime {
  const localProgress = clamp01(sectionProgress);

  const introProgress = normalize(localProgress, 0, 0.15);
  const holdProgress = normalize(localProgress, 0.15, 0.38);
  const breakProgress = smoothstep(0, 1, normalize(localProgress, 0.38, 0.65));
  const revealProgress = smoothstep(0, 1, normalize(localProgress, 0.65, 0.9));
  const exitProgress = normalize(localProgress, 0.9, 1);

  const phase: WorldRevealRuntime['phase'] =
    localProgress < 0.15
      ? 'intro'
      : localProgress < 0.38
        ? 'hold'
        : localProgress < 0.65
          ? 'breakaway'
          : localProgress < 0.9
            ? 'revealed'
            : 'exit';

  return {
    worldId: activeWorld.id,
    phase,
    localProgress,
    introProgress,
    holdProgress,
    breakProgress,
    revealProgress,
    exitProgress,
    isBreaking: phase === 'breakaway',
    isRevealed: phase === 'revealed' || phase === 'exit',
  };
}

export function useSectionRevealRuntime({ activeWorld, sectionProgress }: UseSectionRevealRuntimeArgs): WorldRevealRuntime {
  return useMemo(() => getSectionRevealRuntime(activeWorld, sectionProgress), [activeWorld, sectionProgress]);
}
