import { useMemo } from 'react';
import type { FeaturedWorld } from '../types/world';
import type { WorldRevealRuntime } from '../types/reveal';
import { clamp01, smoothstep } from '../utils/math';

interface UseWorldRevealRuntimeArgs {
  activeWorld: FeaturedWorld;
  progress: number;
}

function normalize(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp01((value - start) / (end - start));
}

export function getWorldRevealRuntime(activeWorld: FeaturedWorld, progress: number): WorldRevealRuntime {
  const [focusStart, focusEnd] = activeWorld.scene.focusRange;
  const localStart = Math.max(0, focusStart - 0.06);
  const localEnd = Math.min(1, focusEnd + 0.08);
  const localProgress = normalize(progress, localStart, localEnd);

  const phase: WorldRevealRuntime['phase'] =
    localProgress < 0
      ? 'pre'
      : localProgress < 0.18
        ? 'intro'
        : localProgress < 0.38
          ? 'hold'
          : localProgress < 0.68
            ? 'breakaway'
            : localProgress < 0.92
              ? 'revealed'
              : 'exit';

  const introProgress = normalize(localProgress, 0, 0.18);
  const holdProgress = normalize(localProgress, 0.18, 0.38);
  const breakProgress = smoothstep(0, 1, normalize(localProgress, 0.38, 0.68));
  const revealProgress = smoothstep(0, 1, normalize(localProgress, 0.68, 0.92));
  const exitProgress = normalize(localProgress, 0.92, 1);

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

export function useWorldRevealRuntime({ activeWorld, progress }: UseWorldRevealRuntimeArgs): WorldRevealRuntime {
  return useMemo(() => getWorldRevealRuntime(activeWorld, progress), [activeWorld, progress]);
}
