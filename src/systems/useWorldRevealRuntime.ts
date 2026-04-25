import { useMemo } from 'react';
import type { WorldRevealRuntime } from '../types/reveal';
import type { FeaturedWorld } from '../types/world';
import { clamp01, smoothstep } from '../utils/math';
import { getStageLocalProgress, WORLD_STAGES } from './worldStageMap';

interface UseWorldRevealRuntimeArgs {
  activeWorld: FeaturedWorld;
  progress: number;
}

function normalize(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp01((value - start) / (end - start));
}

export function getWorldRevealRuntime(activeWorld: FeaturedWorld, progress: number): WorldRevealRuntime {
  const stage = WORLD_STAGES.find((entry) => entry.id === activeWorld.id) ?? WORLD_STAGES[0];
  const localProgress = getStageLocalProgress(progress, stage);

  const introProgress = normalize(localProgress, 0, 0.18);
  const holdProgress = normalize(localProgress, 0.18, 0.38);
  const breakProgress = smoothstep(0, 1, normalize(localProgress, 0.38, 0.68));
  const revealProgress = smoothstep(0, 1, normalize(localProgress, 0.68, 0.92));
  const exitProgress = normalize(localProgress, 0.92, 1);

  const phase: WorldRevealRuntime['phase'] =
    progress < 0.16
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
