export const SCROLL_HEIGHT_DESKTOP_VH = 700;
export const SCROLL_HEIGHT_MOBILE_VH = 760;

export const SCROLL_PHASES = {
  entry: [0.0, 0.1],
  worldsIntro: [0.1, 0.2],
  worldRail: [0.2, 0.72],
  coreFocus: [0.72, 0.84],
  riftTransition: [0.84, 0.94],
  finalBloom: [0.94, 1.0],
} as const;

export const WORLD_SCROLL_TARGETS = {
  'living-macro': 0.28,
  'signal-garden': 0.4,
  'core-chamber': 0.54,
  'aurora-passage': 0.68,
  'rift-bloom': 0.82,
  'future-world': 0.94,
} as const;

export function getScrollYForProgress(progress: number): number {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 0;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(1, progress)) * Math.max(0, maxScroll);
}

export function scrollToProgress(progress: number): void {
  if (typeof window === 'undefined') return;
  window.scrollTo({ top: getScrollYForProgress(progress), behavior: 'smooth' });
}
