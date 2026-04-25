import { useMemo } from 'react';
import { getWorldRevealPreset } from '../data/worldRevealPresets';
import type { WorldRevealRuntime } from '../types/reveal';
import type { WorldId } from '../types/world';
import { clamp01, smoothstep } from '../utils/math';

interface UseWorldRevealRuntimeArgs {
  activeWorldId: WorldId;
  progress: number;
}

function normalize(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp01((value - start) / (end - start));
}

export function getWorldRevealRuntime(worldId: WorldId, progress: number): WorldRevealRuntime {
  const preset = getWorldRevealPreset(worldId);
  const { start, introEnd, holdEnd, breakEnd, revealEnd, exitStart, end } = preset.timing;

  const phase: WorldRevealRuntime['phase'] =
    progress < start
      ? 'pre'
      : progress < introEnd
        ? 'intro'
        : progress < holdEnd
          ? 'hold'
          : progress < breakEnd
            ? 'breakaway'
            : progress < exitStart
              ? 'revealed'
              : 'exit';

  const introProgress = normalize(progress, start, introEnd);
  const holdProgress = normalize(progress, introEnd, holdEnd);
  const breakProgress = smoothstep(0, 1, normalize(progress, holdEnd, breakEnd));
  const revealProgress = smoothstep(0, 1, normalize(progress, breakEnd, revealEnd));
  const exitProgress = normalize(progress, exitStart, end);
  const localProgress = normalize(progress, start, end);

  return {
    worldId,
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

export function useWorldRevealRuntime({ activeWorldId, progress }: UseWorldRevealRuntimeArgs): WorldRevealRuntime {
  return useMemo(() => getWorldRevealRuntime(activeWorldId, progress), [activeWorldId, progress]);
}
