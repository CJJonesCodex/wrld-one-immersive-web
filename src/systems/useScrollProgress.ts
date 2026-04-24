import { useEffect, useState } from 'react';
import { clamp01 } from '../utils/math';

export interface ScrollProgressState {
  progress: number;
  rawProgress: number;
  scrollY: number;
  maxScroll: number;
}

function getMaxScroll(): number {
  if (typeof document === 'undefined' || typeof window === 'undefined') return 1;
  return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
}

export function scrollToProgress(progress: number): void {
  if (typeof window === 'undefined') return;
  window.scrollTo({
    top: clamp01(progress) * getMaxScroll(),
    behavior: 'smooth',
  });
}

export function useScrollProgress(): ScrollProgressState {
  const [state, setState] = useState<ScrollProgressState>({ progress: 0, rawProgress: 0, scrollY: 0, maxScroll: 1 });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    let raf = 0;

    const measure = () => {
      const scrollY = window.scrollY;
      const maxScroll = getMaxScroll();
      const rawProgress = scrollY / maxScroll;
      setState({ scrollY, maxScroll, rawProgress, progress: clamp01(rawProgress) });
      raf = 0;
    };

    const onScrollOrResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return state;
}
