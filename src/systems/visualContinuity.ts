import type { ScenePhase } from './useScenePhase';
import type { TitleRevealPhase } from '../types/reveal';

export type TitleMode = 'hidden' | 'full' | 'breaking' | 'ghost' | 'compact';

export interface VisualContinuityState {
  showHero: boolean;
  showTitlePortal: boolean;
  showBreakParticles: boolean;
  showWorldReveal: boolean;
  titleMode: TitleMode;
  revealOpacity: number;
  titleOpacity: number;
  particlesOpacity: number;
}

interface VisualContinuityArgs {
  scenePhase: ScenePhase;
  revealPhase: TitleRevealPhase;
  breakProgress: number;
  revealProgress: number;
  exitProgress: number;
  drawerOpen: boolean;
  detailOpen: boolean;
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * clamp01(amount);

export function getVisualContinuityState({ scenePhase, revealPhase, breakProgress, revealProgress, exitProgress, drawerOpen, detailOpen }: VisualContinuityArgs): VisualContinuityState {
  let state: VisualContinuityState;

  if (scenePhase === 'hero') {
    state = { showHero: true, showTitlePortal: false, showBreakParticles: false, showWorldReveal: false, titleMode: 'hidden', revealOpacity: 0, titleOpacity: 0, particlesOpacity: 0 };
  } else if (revealPhase === 'breakaway') {
    state = { showHero: false, showTitlePortal: true, showBreakParticles: true, showWorldReveal: true, titleMode: 'breaking', revealOpacity: lerp(0.2, 1, breakProgress), titleOpacity: 1 - clamp01(breakProgress), particlesOpacity: breakProgress < 0.72 ? lerp(0.45, 0.9, breakProgress / 0.72) : lerp(0.9, 0.35, (breakProgress - 0.72) / 0.28) };
  } else if (revealPhase === 'revealed') {
    state = { showHero: false, showTitlePortal: revealProgress < 0.75, showBreakParticles: false, showWorldReveal: true, titleMode: revealProgress >= 0.75 ? 'ghost' : 'compact', revealOpacity: Math.max(0.75, revealProgress), titleOpacity: revealProgress >= 0.75 ? 0.1 : 0.4, particlesOpacity: 0 };
  } else if (revealPhase === 'exit') {
    state = { showHero: false, showTitlePortal: exitProgress < 0.72, showBreakParticles: false, showWorldReveal: true, titleMode: 'compact', revealOpacity: Math.max(0.55, 1 - exitProgress * 0.35), titleOpacity: Math.max(0.25, 0.45 - exitProgress * 0.2), particlesOpacity: 0 };
  } else {
    state = { showHero: false, showTitlePortal: true, showBreakParticles: false, showWorldReveal: true, titleMode: revealPhase === 'pre' ? 'compact' : 'full', revealOpacity: revealPhase === 'pre' ? 0.35 : 0.16, titleOpacity: revealPhase === 'pre' ? 0.45 : 1, particlesOpacity: 0 };
  }

  if (drawerOpen || detailOpen) {
    state = { ...state, showWorldReveal: true, revealOpacity: Math.max(0.16, state.revealOpacity * 0.42), titleOpacity: Math.min(state.titleOpacity, 0.08), showBreakParticles: false, particlesOpacity: 0 };
  }

  // Invariant: after the hero, either the active title or the active world reveal must remain visible.
  if (!state.showHero && !state.showTitlePortal && state.revealOpacity < 0.75) {
    state = { ...state, showTitlePortal: true, titleMode: 'compact', titleOpacity: Math.max(state.titleOpacity, 0.35), showWorldReveal: true, revealOpacity: Math.max(state.revealOpacity, 0.35) };
  }

  state.revealOpacity = clamp01(state.revealOpacity);
  state.titleOpacity = clamp01(state.titleOpacity);
  state.particlesOpacity = clamp01(state.particlesOpacity);
  return state;
}
