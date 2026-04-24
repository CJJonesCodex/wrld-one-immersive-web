import { useMemo } from 'react';
import { featuredWorlds } from '../data/featuredWorlds';
import type { FeaturedWorld } from '../types/world';
import { getActiveStrength } from '../utils/math';

export function getActiveWorld(progress: number): FeaturedWorld {
  let current = featuredWorlds[0];
  let bestScore = -Infinity;
  for (const world of featuredWorlds) {
    const targetDistance = Math.abs(progress - world.scene.scrollTarget);
    const focus = getActiveStrength(progress, world.scene.focusRange);
    const score = focus * 2 - targetDistance;
    if (score > bestScore) {
      bestScore = score;
      current = world;
    }
  }
  return current;
}

export function useActiveWorld(progress: number): FeaturedWorld {
  return useMemo(() => getActiveWorld(progress), [progress]);
}
