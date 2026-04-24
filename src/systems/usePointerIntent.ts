import { useEffect, useState } from 'react';

export type PointerIntent = 'default' | 'interactive';

export function usePointerIntent() {
  const [intent, setIntent] = useState<PointerIntent>('default');

  useEffect(() => {
    const onOver = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const interactive = target.closest('[data-cursor="interactive"]');
      setIntent(interactive ? 'interactive' : 'default');
    };

    window.addEventListener('mouseover', onOver, { passive: true });
    return () => window.removeEventListener('mouseover', onOver);
  }, []);

  return intent;
}
