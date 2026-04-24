import { useCallback, useState } from 'react';

export function useHaptics() {
  const [enabled, setEnabled] = useState(false);
  const supported = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next && supported) {
        navigator.vibrate?.(16);
      }
      return next;
    });
  }, [supported]);

  const pulse = useCallback(
    (pattern: number | number[] = 8) => {
      if (enabled && supported) {
        navigator.vibrate?.(pattern);
      }
    },
    [enabled, supported],
  );

  return { enabled, supported, toggle, pulse };
}
