import { useEffect, useState } from 'react';

interface RecoloredCursorProps {
  accent: string;
}

export function RecoloredCursor({ accent }: RecoloredCursorProps) {
  const [visible, setVisible] = useState(false);
  const [dot, setDot] = useState({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 900) return;
    setVisible(true);
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let rx = 0;
    let ry = 0;

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      setDot({ x: tx, y: ty });
      const el = (event.target as Element | null)?.closest('button, a, [data-cursor="interactive"], .tap-target');
      setInteractive(Boolean(el));
    };
    const loop = () => {
      rx += (tx - rx) * 0.2;
      ry += (ty - ry) * 0.2;
      setRing({ x: rx, y: ry });
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  if (!visible) return null;
  return (
    <div className="custom-cursor" aria-hidden>
      <div className="custom-cursor__dot" style={{ transform: `translate3d(${dot.x}px, ${dot.y}px, 0)`, background: accent }} />
      <div className="custom-cursor__ring" style={{ transform: `translate3d(${ring.x}px, ${ring.y}px, 0) scale(${interactive ? 1.8 : 1})` }} />
    </div>
  );
}
