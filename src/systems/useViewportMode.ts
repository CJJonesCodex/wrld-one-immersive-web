import { useCallback, useEffect, useMemo, useState } from 'react';

export type ViewportMode = 'cinematic' | 'mobile-fit';

export interface ViewportModeState {
  mode: ViewportMode;
  isMobileFit: boolean;
  isPhoneViewport: boolean;
  showStandaloneToggle: boolean;
  toggleMode: () => void;
  setMode: (mode: ViewportMode) => void;
}

const PHONE_WIDTH = 820;
const TOGGLE_HEIGHT = 720;
const STORAGE_KEY = 'wrld-one-viewport-mode';

function getViewportSnapshot() {
  if (typeof window === 'undefined') {
    return { isPhoneViewport: false, showStandaloneToggle: true, defaultMode: 'cinematic' as ViewportMode };
  }

  const isPhoneViewport = window.innerWidth <= PHONE_WIDTH;
  const showStandaloneToggle = window.innerHeight >= TOGGLE_HEIGHT || !isPhoneViewport;
  const defaultMode: ViewportMode = isPhoneViewport ? 'mobile-fit' : 'cinematic';
  return { isPhoneViewport, showStandaloneToggle, defaultMode };
}

export function useViewportMode(): ViewportModeState {
  const [viewport, setViewport] = useState(getViewportSnapshot);
  const [mode, setModeState] = useState<ViewportMode>(() => {
    if (typeof window === 'undefined') return 'cinematic';
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'cinematic' || saved === 'mobile-fit') return saved;
    return getViewportSnapshot().defaultMode;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => setViewport(getViewportSnapshot());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const setMode = useCallback((nextMode: ViewportMode) => {
    setModeState(nextMode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'cinematic' ? 'mobile-fit' : 'cinematic');
  }, [mode, setMode]);

  return useMemo(
    () => ({
      mode,
      isMobileFit: mode === 'mobile-fit',
      isPhoneViewport: viewport.isPhoneViewport,
      showStandaloneToggle: viewport.showStandaloneToggle,
      toggleMode,
      setMode,
    }),
    [mode, setMode, toggleMode, viewport.isPhoneViewport, viewport.showStandaloneToggle],
  );
}

