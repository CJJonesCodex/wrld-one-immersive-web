import { useEffect, useMemo, useState } from 'react';
import { HUD, ZoneInfo } from './components/HUD';
import { LoadingScreen } from './components/LoadingScreen';
import { WebGLFallback } from './components/WebGLFallback';
import { World } from './scenes/World';
import { useScrollProgress } from './systems/useScrollProgress';
import { useQuality } from './systems/useQuality';
import { isWebGLAvailable } from './utils/webgl';

function App() {
  const [webglReady] = useState(() => isWebGLAvailable());
  const [activeZone, setActiveZone] = useState<ZoneInfo | null>(null);
  const [worldReady, setWorldReady] = useState(false);
  const [bootElapsed, setBootElapsed] = useState(0);
  const { progress } = useScrollProgress();
  const { quality, setQuality } = useQuality();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveZone(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const bootDurationMs = 1400;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(now - start, bootDurationMs);
      setBootElapsed((elapsed / bootDurationMs) * 100);
      if (elapsed < bootDurationMs) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const loadingProgress = useMemo(() => {
    if (!worldReady) {
      return Math.min(bootElapsed, 92);
    }
    return Math.max(bootElapsed, 100);
  }, [bootElapsed, worldReady]);

  const showLoader = loadingProgress < 100;

  if (!webglReady) {
    return <WebGLFallback />;
  }

  return (
    <main className="app-root">
      <World
        progress={progress}
        quality={quality}
        onSelectZone={setActiveZone}
        onReady={() => setWorldReady(true)}
      />
      <HUD
        zone={activeZone}
        onClose={() => setActiveZone(null)}
        quality={quality.level}
        setQuality={setQuality}
        progress={progress}
      />
      <LoadingScreen visible={showLoader} progress={loadingProgress} />
    </main>
  );
}

export default App;
