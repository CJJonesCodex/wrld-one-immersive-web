import { featuredWorlds } from '../data/featuredWorlds';
import type { FeaturedWorld, WorldId } from '../types/world';

export interface WorldStage {
  id: WorldId;
  start: number;
  end: number;
  titleEnter: number;
  titleHold: number;
  revealStart: number;
  revealHold: number;
}

export const WORLD_STAGES: WorldStage[] = [
  {
    id: 'living-macro',
    start: 0.16,
    end: 0.34,
    titleEnter: 0.16,
    titleHold: 0.2,
    revealStart: 0.25,
    revealHold: 0.3,
  },
  {
    id: 'signal-garden',
    start: 0.34,
    end: 0.48,
    titleEnter: 0.34,
    titleHold: 0.37,
    revealStart: 0.41,
    revealHold: 0.45,
  },
  {
    id: 'core-chamber',
    start: 0.48,
    end: 0.62,
    titleEnter: 0.48,
    titleHold: 0.51,
    revealStart: 0.55,
    revealHold: 0.59,
  },
  {
    id: 'aurora-passage',
    start: 0.62,
    end: 0.76,
    titleEnter: 0.62,
    titleHold: 0.65,
    revealStart: 0.69,
    revealHold: 0.73,
  },
  {
    id: 'rift-bloom',
    start: 0.76,
    end: 0.88,
    titleEnter: 0.76,
    titleHold: 0.79,
    revealStart: 0.82,
    revealHold: 0.86,
  },
  {
    id: 'future-world',
    start: 0.88,
    end: 1,
    titleEnter: 0.88,
    titleHold: 0.91,
    revealStart: 0.94,
    revealHold: 0.98,
  },
];

export function getWorldStage(progress: number): WorldStage {
  const clamped = Math.max(0, Math.min(1, progress));

  if (clamped < WORLD_STAGES[0].start) {
    return WORLD_STAGES[0];
  }

  return WORLD_STAGES.find((stage) => clamped >= stage.start && clamped < stage.end) ?? WORLD_STAGES[WORLD_STAGES.length - 1];
}

export function getWorldForStage(progress: number): FeaturedWorld {
  const stage = getWorldStage(progress);
  return featuredWorlds.find((world) => world.id === stage.id) ?? featuredWorlds[0];
}

export function getStageLocalProgress(progress: number, stage: WorldStage): number {
  return Math.max(0, Math.min(1, (progress - stage.start) / (stage.end - stage.start)));
}
