import { useEffect, useRef, useState } from 'react';

interface ScrollProgressState {
  progress: number;
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function useScrollProgress(): ScrollProgressState {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      targetRef.current = clamp(targetRef.current + event.deltaY * 0.00045);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'PageDown') {
        targetRef.current = clamp(targetRef.current + 0.05);
      }
      if (event.key === 'PageUp') {
        targetRef.current = clamp(targetRef.current - 0.05);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchY.current === null) {
        return;
      }

      const nextY = event.touches[0]?.clientY ?? touchY.current;
      const delta = touchY.current - nextY;
      targetRef.current = clamp(targetRef.current + delta * 0.0012);
      touchY.current = nextY;
    };

    const tick = () => {
      setProgress((prev) => {
        const next = prev + (targetRef.current - prev) * 0.08;
        return Math.abs(next - targetRef.current) < 0.0002 ? targetRef.current : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return { progress };
}
