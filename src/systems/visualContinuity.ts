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
