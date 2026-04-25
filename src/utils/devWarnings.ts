import type { ScenePhase } from '../systems/useScenePhase';
import type { VisualContinuityState } from '../systems/useVisualContinuity';
import type { ViewportMode } from '../systems/useViewportMode';
import type { FeaturedWorld } from '../types/world';

export function logContinuityWarnings(args: {
  continuity: VisualContinuityState;
  scenePhase: ScenePhase;
  viewportMode?: ViewportMode;
  activeWorld?: FeaturedWorld | null;
}) {
  if (!import.meta.env.DEV) return;

  const { continuity, scenePhase, viewportMode, activeWorld } = args;

  if (scenePhase !== 'hero' && !continuity.showTitlePortal && !continuity.showWorldReveal) {
    console.warn('[wrld-one] continuity invalid: title and reveal are both hidden in non-hero phase');
  }
  if (!viewportMode) {
    console.warn('[wrld-one] viewport mode missing');
  }
  if (!activeWorld) {
    console.warn('[wrld-one] active world missing');
  }
  if (scenePhase !== 'hero' && continuity.revealOpacity <= 0) {
    console.warn('[wrld-one] reveal opacity is zero outside hero');
  }
  if (scenePhase !== 'hero' && continuity.titleOpacity <= 0 && continuity.revealOpacity < 0.75) {
    console.warn('[wrld-one] title hidden before reveal is sufficiently visible');
  }
}


export function warnIfBlankRisk(args: {
  phase: string;
  titleOpacity: number;
  revealOpacity: number;
  screenRevealOpacity: number;
}) {
  if (
    import.meta.env.DEV &&
    args.phase !== 'hero' &&
    args.titleOpacity <= 0.05 &&
    args.revealOpacity <= 0.05 &&
    args.screenRevealOpacity <= 0.05
  ) {
    console.warn('[WRLD ONE] Blank-risk state detected', args);
  }
}
