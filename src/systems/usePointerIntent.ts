import { useEffect, useState } from 'react';
import { clamp01 } from '../utils/math';

export interface PointerIntent {
  x: number;
  y: number;
  smoothX: number;
  smoothY: number;
  isTouch: boolean;
  isInteracting: boolean;
}

export function usePointerIntent(): PointerIntent {
  const [intent, setIntent] = useState<PointerIntent>({ x: 0, y: 0, smoothX: 0, smoothY: 0, isTouch: false, isInteracting: false });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let sx = 0;
    let sy = 0;
    let isTouch = false;

    const loop = () => {
      sx += (tx - sx) * 0.12;
      sy += (ty - sy) * 0.12;
      setIntent((prev) => ({ ...prev, smoothX: sx, smoothY: sy, x: tx, y: ty, isTouch }));
      raf = requestAnimationFrame(loop);
    };

    const toNorm = (clientX: number, clientY: number) => {
      tx = clamp01(clientX / window.innerWidth) * 2 - 1;
      ty = clamp01(clientY / window.innerHeight) * 2 - 1;
    };

    const onMouseMove = (event: MouseEvent) => {
      isTouch = false;
      toNorm(event.clientX, event.clientY);
      setIntent((prev) => ({ ...prev, isInteracting: true, isTouch: false }));
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!event.touches[0]) return;
      isTouch = true;
      toNorm(event.touches[0].clientX, event.touches[0].clientY);
      setIntent((prev) => ({ ...prev, isInteracting: true, isTouch: true }));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return intent;
}
