import type { ScenePhase } from './useScenePhase';
import type { TitleRevealPhase } from '../types/reveal';
import { clamp01 } from '../utils/math';

export interface VisualContinuityState {
  showHero: boolean;
  showTitlePortal: boolean;
  showBreakParticles: boolean;
  showWorldReveal: boolean;
  titleMode: 'hidden' | 'full' | 'breaking' | 'ghost' | 'compact';
  revealOpacity: number;
  titleOpacity: number;
  particlesOpacity: number;
}

export function getVisualContinuityState(args: {
  progress: number;
  scenePhase: ScenePhase;
  revealPhase: TitleRevealPhase;
  breakProgress: number;
  revealProgress: number;
  exitProgress: number;
  drawerOpen: boolean;
  detailOpen: boolean;
}): VisualContinuityState {
  const { scenePhase, revealPhase, breakProgress, revealProgress, exitProgress, drawerOpen, detailOpen } = args;

  let state: VisualContinuityState;

  if (scenePhase === 'hero') {
    state = {
      showHero: true,
      showTitlePortal: false,
      showBreakParticles: false,
      showWorldReveal: false,
      titleMode: 'hidden',
      revealOpacity: 0,
      titleOpacity: 0,
      particlesOpacity: 0,
    };
  } else if (revealPhase === 'intro' || revealPhase === 'hold' || revealPhase === 'pre') {
    state = {
      showHero: false,
      showTitlePortal: true,
      showBreakParticles: false,
      showWorldReveal: true,
      titleMode: 'full',
      revealOpacity: 0.1 + clamp01(revealProgress) * 0.12,
      titleOpacity: 1,
      particlesOpacity: 0,
    };
  } else if (revealPhase === 'breakaway') {
    const particlesPeak = breakProgress <= 0.65 ? 0.45 + breakProgress * 0.69 : 0.9 - (breakProgress - 0.65) * 1.57;
    state = {
      showHero: false,
      showTitlePortal: true,
      showBreakParticles: true,
      showWorldReveal: true,
      titleMode: 'breaking',
      revealOpacity: clamp01(0.2 + breakProgress * 0.8),
      titleOpacity: clamp01(1 - breakProgress),
      particlesOpacity: clamp01(particlesPeak),
    };
  } else if (revealPhase === 'revealed') {
    state = {
      showHero: false,
      showTitlePortal: false,
      showBreakParticles: false,
      showWorldReveal: true,
      titleMode: 'hidden',
      revealOpacity: 1,
      titleOpacity: 0.08,
      particlesOpacity: 0,
    };
  } else if (revealPhase === 'exit') {
    state = {
      showHero: false,
      showTitlePortal: true,
      showBreakParticles: false,
      showWorldReveal: true,
      titleMode: exitProgress > 0.45 ? 'compact' : 'ghost',
      revealOpacity: Math.max(0.55, 1 - exitProgress * 0.28),
      titleOpacity: 0.25 + exitProgress * 0.2,
      particlesOpacity: 0,
    };
  } else {
    state = {
      showHero: false,
      showTitlePortal: true,
      showBreakParticles: false,
      showWorldReveal: true,
      titleMode: 'compact',
      revealOpacity: 0.35,
      titleOpacity: 0.45,
      particlesOpacity: 0,
    };
  }

  if (drawerOpen || detailOpen) {
    state.revealOpacity = Math.max(0.16, state.revealOpacity * 0.45);
    state.titleOpacity = Math.max(0.08, state.titleOpacity * 0.4);
  }

  // NON-NEGOTIABLE: the title cannot disappear until the active world reveal is visible.
  // This prevents blank cream-background states during scroll transitions.
  if (!state.showHero && state.titleMode === 'hidden' && state.revealOpacity < 0.75) {
    state.titleMode = 'compact';
    state.showTitlePortal = true;
    state.titleOpacity = Math.max(state.titleOpacity, 0.35);
  }

  if (!state.showHero && !state.showTitlePortal && !state.showWorldReveal) {
    state.showTitlePortal = true;
    state.titleMode = 'compact';
    state.titleOpacity = 0.45;
    state.showWorldReveal = true;
    state.revealOpacity = 0.35;
  }

  if (!state.showHero && state.titleOpacity <= 0 && state.revealOpacity <= 0) {
    state.showTitlePortal = true;
    state.showWorldReveal = true;
    state.titleMode = 'compact';
    state.titleOpacity = 0.35;
    state.revealOpacity = 0.35;
  }

  if (!state.showHero && !state.showWorldReveal) {
    state.showTitlePortal = true;
    state.titleMode = 'compact';
    state.titleOpacity = Math.max(state.titleOpacity, 0.35);
  }

  state.titleOpacity = clamp01(state.titleOpacity);
  state.revealOpacity = clamp01(state.revealOpacity);
  state.particlesOpacity = clamp01(state.particlesOpacity);

  return state;
}

