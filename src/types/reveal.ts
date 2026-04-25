import type { WorldId, QualityLevel } from './world';

export type TitleRevealPhase = 'pre' | 'intro' | 'hold' | 'breakaway' | 'revealed' | 'exit';

export type TitleBreakStyle =
  | 'dew-dissolve'
  | 'signal-slice'
  | 'halo-collapse'
  | 'ribbon-smear'
  | 'petal-aperture'
  | 'constellation-deconstruct';

export interface WorldRevealTiming {
  start: number;
  introEnd: number;
  holdEnd: number;
  breakEnd: number;
  revealEnd: number;
  exitStart: number;
  end: number;
}

export interface WorldRevealPreset {
  worldId: WorldId;
  breakStyle: TitleBreakStyle;
  timing: WorldRevealTiming;
  titleExitDirection: 'up' | 'down' | 'left' | 'right' | 'radial' | 'depth';
  shardCount: Record<QualityLevel, number>;
  worldObjectCount: Record<QualityLevel, number>;
  mobileDensityScale: number;
}

export interface WorldRevealRuntime {
  worldId: WorldId;
  phase: TitleRevealPhase;
  localProgress: number;
  introProgress: number;
  holdProgress: number;
  breakProgress: number;
  revealProgress: number;
  exitProgress: number;
  isBreaking: boolean;
  isRevealed: boolean;
}
