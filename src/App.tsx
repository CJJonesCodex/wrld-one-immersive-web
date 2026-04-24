import { useEffect, useMemo, useState } from 'react';
import { HUD } from './components/HUD';
import { LoadingScreen } from './components/LoadingScreen';
import { WebGLFallback } from './components/WebGLFallback';
import { World } from './scenes/World';
import { useQuality } from './systems/useQuality';
import { isWebGLAvailable } from './utils/webgl';
import { featuredWorlds } from './data/featuredWorlds';
import { useScrollSections } from './systems/useScrollSections';
import { useActiveWorld } from './systems/useActiveWorld';
import { FeaturedWorksIndex } from './components/FeaturedWorksIndex';
import { ScrollbarNav } from './components/ScrollbarNav';
import { SensoryControls } from './components/SensoryControls';
import { useHaptics } from './systems/useHaptics';
import { useAmbientSound } from './systems/useAmbientSound';
import { useDeviceSensor } from './systems/useDeviceSensor';
import { RecoloredCursor } from './components/RecoloredCursor';
import { AudioVisualizer } from './components/AudioVisualizer';

function App() {
  const [webglReady] = useState(() => isWebGLAvailable());
  const [panelWorldIndex, setPanelWorldIndex] = useState<number | null>(null);
  const [worldReady, setWorldReady] = useState(false);
  const [bootElapsed, setBootElapsed] = useState(0);
  const [indexCollapsed, setIndexCollapsed] = useState(true);

  const { quality, setQuality } = useQuality();
  const { progress, activeIndex, scrollToIndex } = useScrollSections(featuredWorlds.length);
  const activeWorld = useActiveWorld(activeIndex);
  const haptics = useHaptics();
  const ambient = useAmbientSound();
  const sensor = useDeviceSensor();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPanelWorldIndex(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const bootDurationMs = 1100;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(now - start, bootDurationMs);
      setBootElapsed((elapsed / bootDurationMs) * 100);
      if (elapsed < bootDurationMs) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 800px)').matches;
    setIndexCollapsed(mobile);
  }, []);

  const loadingProgress = useMemo(() => (!worldReady ? Math.min(bootElapsed, 92) : 100), [bootElapsed, worldReady]);

  if (!webglReady) {
    return <WebGLFallback />;
  }

  const openWorld = (index: number) => {
    scrollToIndex(index);
    setPanelWorldIndex(index);
    haptics.pulse([8, 18, 8]);
  };

  return (
    <main className="app-root">
      <World
        progress={progress}
        activeIndex={activeIndex}
        quality={quality}
        sensorOffset={sensor.enabled ? sensor.vector : { x: 0, y: 0 }}
        soundOn={ambient.enabled}
        onSelectWorld={openWorld}
        onReady={() => setWorldReady(true)}
      />

      <HUD
        activeWorld={activeWorld}
        panelWorld={panelWorldIndex === null ? null : featuredWorlds[panelWorldIndex]}
        onClosePanel={() => setPanelWorldIndex(null)}
        quality={quality.level}
        setQuality={setQuality}
        progress={progress}
      />

      <FeaturedWorksIndex
        worlds={featuredWorlds}
        activeIndex={activeIndex}
        collapsed={indexCollapsed}
        onToggleCollapse={() => setIndexCollapsed((prev) => !prev)}
        onSelect={openWorld}
      />

      <ScrollbarNav count={featuredWorlds.length} activeIndex={activeIndex} progress={progress} onSelect={openWorld} />

      <div className="hud-controls">
        <SensoryControls
          soundOn={ambient.enabled}
          hapticsOn={haptics.enabled}
          sensorOn={sensor.enabled}
          onToggleSound={ambient.toggle}
          onToggleHaptics={haptics.toggle}
          onToggleSensor={sensor.toggle}
        />
        <AudioVisualizer analyser={ambient.analyser} visible={ambient.enabled} />
      </div>

      <RecoloredCursor />
      <LoadingScreen visible={loadingProgress < 100} progress={loadingProgress} />
    </main>
  );
}

export default App;
