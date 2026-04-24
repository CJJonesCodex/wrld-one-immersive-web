import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function useScrollSections(sectionCount: number) {
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const touchY = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const scrollToIndex = useCallback(
    (index: number) => {
      const next = clamp(index / Math.max(sectionCount - 1, 1));
      setTargetProgress(next);
    },
    [sectionCount],
  );

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      setTargetProgress((prev) => clamp(prev + event.deltaY * 0.00045));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'PageDown' || event.key === 'ArrowDown') {
        setTargetProgress((prev) => clamp(prev + 0.06));
      }
      if (event.key === 'PageUp' || event.key === 'ArrowUp') {
        setTargetProgress((prev) => clamp(prev - 0.06));
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchY.current === null) return;
      const nextY = event.touches[0]?.clientY ?? touchY.current;
      const delta = touchY.current - nextY;
      setTargetProgress((prev) => clamp(prev + delta * 0.0015));
      touchY.current = nextY;
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      setProgress((prev) => {
        const next = prev + (targetProgress - prev) * 0.08;
        if (Math.abs(next - targetProgress) < 0.0002) return targetProgress;
        return next;
      });
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [targetProgress]);

  const activeIndex = useMemo(() => {
    return Math.min(sectionCount - 1, Math.max(0, Math.round(progress * Math.max(sectionCount - 1, 1))));
  }, [progress, sectionCount]);

  return {
    progress,
    targetProgress,
    activeIndex,
    setTargetProgress,
    scrollToIndex,
  };
}
