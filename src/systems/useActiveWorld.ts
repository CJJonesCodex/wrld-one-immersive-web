import { useMemo } from 'react';
import type { FeaturedWorld } from '../types/world';
import { getWorldForStage } from './worldStageMap';

export function getActiveWorld(progress: number): FeaturedWorld {
  return getWorldForStage(progress);
}

export function useActiveWorld(progress: number): FeaturedWorld {
  return useMemo(() => getWorldForStage(progress), [progress]);
}
