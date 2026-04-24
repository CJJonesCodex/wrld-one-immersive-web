import { useMemo, useState } from 'react';

export interface HapticsState {
  enabled: boolean;
  supported: boolean;
  toggle: () => void;
  pulse: (duration?: number) => void;
}

export function useHaptics(): HapticsState {
  const supported = useMemo(() => typeof navigator !== 'undefined' && 'vibrate' in navigator, []);
  const [enabled, setEnabled] = useState(false);

  return {
    enabled,
    supported,
    toggle: () => setEnabled((prev) => !prev),
    pulse: (duration = 12) => {
      if (!supported || !enabled || typeof navigator === 'undefined') return;
      try {
        navigator.vibrate(duration);
      } catch {
        // no-op
      }
    },
  };
}
