import { Canvas } from '@react-three/fiber';
import { featuredWorlds, getWorldById } from './data/featuredWorlds';
import { World } from './scenes/World';
import { useScrollProgress } from './systems/useScrollProgress';
import { useActiveWorld } from './systems/useActiveWorld';
import { usePointerIntent } from './systems/usePointerIntent';
import { useQuality } from './systems/useQuality';
import { useAmbientSound } from './systems/useAmbientSound';
import { useHaptics } from './systems/useHaptics';
import { useDeviceSensor } from './systems/useDeviceSensor';
import { HeroOverlay } from './components/HeroOverlay';
import { HUD } from './components/HUD';
import { WorldDetailPanel } from './components/WorldDetailPanel';
import { RecoloredCursor } from './components/RecoloredCursor';
import { SCROLL_HEIGHT_DESKTOP_VH, SCROLL_HEIGHT_MOBILE_VH, scrollToProgress } from './constants/scrollMap';
import { useMemo, useState } from 'react';
import type { WorldId } from './types/world';
import { useReducedMotion } from './systems/useReducedMotion';

function App() {
  const [selectedWorldId, setSelectedWorldId] = useState<WorldId | null>(null);
  const { progress } = useScrollProgress();
  const activeWorld = useActiveWorld(progress);
  const pointer = usePointerIntent();
  const { quality } = useQuality();
  const sound = useAmbientSound();
  const haptics = useHaptics();
  const sensor = useDeviceSensor();
  const reducedMotion = useReducedMotion();

  const selectedWorld = useMemo(() => (selectedWorldId ? getWorldById(selectedWorldId) ?? null : null), [selectedWorldId]);

  return (
    <div className="site-shell">
      <div className="scroll-space" style={{ height: `${typeof window !== 'undefined' && window.innerWidth < 821 ? SCROLL_HEIGHT_MOBILE_VH : SCROLL_HEIGHT_DESKTOP_VH}vh` }} />
      <Canvas className="canvas-layer" dpr={[1, quality.dpr]} gl={{ antialias: quality.antialias, powerPreference: 'high-performance', alpha: true }} camera={{ near: 0.1, far: 60, fov: 42 }}>
        <World
          progress={progress}
          activeWorld={activeWorld}
          selectedWorldId={selectedWorldId}
          quality={quality.level}
          pointer={pointer}
          sensor={sensor}
          onSelectWorld={setSelectedWorldId}
          haptics={haptics}
          worlds={featuredWorlds}
          reducedMotion={reducedMotion}
        />
      </Canvas>
      <div className="hud-layer">
        <HeroOverlay progress={progress} />
        <HUD
          progress={progress}
          activeWorld={activeWorld}
          selectedWorld={selectedWorld}
          featuredWorlds={featuredWorlds}
          onSelectWorld={setSelectedWorldId}
          onCloseWorld={() => setSelectedWorldId(null)}
          onNavigateToWorld={(id) => {
            const world = getWorldById(id);
            if (!world) return;
            scrollToProgress(world.scene.scrollTarget);
            setSelectedWorldId(id);
            haptics.pulse(12);
          }}
          sound={sound}
          haptics={haptics}
          sensor={sensor}
        />
        <WorldDetailPanel world={selectedWorld} onClose={() => setSelectedWorldId(null)} />
        <RecoloredCursor accent={activeWorld.colors.accent} />
      </div>
    </div>
  );
}

export default App;
