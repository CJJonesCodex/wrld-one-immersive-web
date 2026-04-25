import { useCallback, useEffect, useState } from 'react';

export type ViewportMode = 'cinematic' | 'mobile-fit';

export interface ViewportModeState {
  mode: ViewportMode;
  isMobileFit: boolean;
  isPhoneViewport: boolean;
  showStandaloneToggle: boolean;
  toggleMode: () => void;
  setMode: (mode: ViewportMode) => void;
}

const STORAGE_KEY = 'wrld-one-viewport-mode';
const PHONE_WIDTH = 820;
const SHORT_HEIGHT = 720;

function getSnapshot() {
  if (typeof window === 'undefined') {
    return { isPhoneViewport: false, showStandaloneToggle: true, defaultMode: 'cinematic' as ViewportMode };
  }
  const isPhoneViewport = window.innerWidth <= PHONE_WIDTH;
  return {
    isPhoneViewport,
    showStandaloneToggle: !isPhoneViewport || window.innerHeight >= SHORT_HEIGHT,
    defaultMode: isPhoneViewport ? ('mobile-fit' as ViewportMode) : ('cinematic' as ViewportMode),
  };
}

function readStoredMode(): ViewportMode | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'cinematic' || stored === 'mobile-fit' ? stored : null;
  } catch {
    return null;
  }
}

function writeStoredMode(mode: ViewportMode) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    return;
  }
}

export function useViewportMode(): ViewportModeState {
  const initial = getSnapshot();
  const [mode, setModeState] = useState<ViewportMode>(readStoredMode() ?? initial.defaultMode);
  const [isPhoneViewport, setIsPhoneViewport] = useState(initial.isPhoneViewport);
  const [showStandaloneToggle, setShowStandaloneToggle] = useState(initial.showStandaloneToggle);

  useEffect(() => {
    const onResize = () => {
      const snapshot = getSnapshot();
      setIsPhoneViewport(snapshot.isPhoneViewport);
      setShowStandaloneToggle(snapshot.showStandaloneToggle);
      if (!readStoredMode()) setModeState(snapshot.defaultMode);
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const setMode = useCallback((nextMode: ViewportMode) => {
    setModeState(nextMode);
    writeStoredMode(nextMode);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((current) => {
      const next = current === 'mobile-fit' ? 'cinematic' : 'mobile-fit';
      writeStoredMode(next);
      return next;
    });
  }, []);

  return { mode, isMobileFit: mode === 'mobile-fit', isPhoneViewport, showStandaloneToggle, toggleMode, setMode };
}
