import { useEffect, useState } from 'react';
import { usePointerIntent } from '../systems/usePointerIntent';

export function RecoloredCursor() {
  const [visible, setVisible] = useState(false);
  const intent = usePointerIntent();

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduce) return;

    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
      setVisible(true);
    };

    const onOut = () => setVisible(false);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onOut);
    };
  }, []);

  return <div className={`recolored-cursor ${visible ? 'visible' : ''} ${intent}`} aria-hidden="true" />;
}
