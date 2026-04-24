import { Canvas } from '@react-three/fiber';
import { useMemo, useState } from 'react';
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
import { WorldTitleOverlay } from './components/WorldTitleOverlay';
import { WorldDetailPanel } from './components/WorldDetailPanel';
import { RecoloredCursor } from './components/RecoloredCursor';
import type { WorldId } from './types/world';
import { useReducedMotion } from './systems/useReducedMotion';
import { getScenePhase } from './systems/useScenePhase';

function App() {
  const [selectedWorldId, setSelectedWorldId] = useState<WorldId | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { progress } = useScrollProgress();
  const activeWorld = useActiveWorld(progress);
  const pointer = usePointerIntent();
  const { quality } = useQuality();
  const sound = useAmbientSound();
  const haptics = useHaptics();
  const sensor = useDeviceSensor();
  const reducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 820 : false;

  const selectedWorld = useMemo(() => (selectedWorldId ? getWorldById(selectedWorldId) ?? null : null), [selectedWorldId]);
  const phaseState = getScenePhase(progress, isMobile);

  const sceneVeilOpacity = selectedWorld ? 0.28 : drawerOpen ? 0.22 : phaseState.showHero ? 0.18 : 0;

  return (
    <main className="site-shell">
      <div className="scroll-space" aria-hidden="true" />
      <div className="canvas-layer">
        <Canvas className="world-canvas" dpr={[1, quality.dpr]} gl={{ antialias: quality.antialias, powerPreference: 'high-performance', alpha: true }} camera={{ near: 0.1, far: 60, fov: isMobile ? 46 : 42 }}>
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
            phaseState={phaseState}
            mobileDrawerOpen={drawerOpen}
            detailOpen={Boolean(selectedWorld)}
            isMobile={isMobile}
          />
        </Canvas>
      </div>

      <div className="hud-layer">
        <div className="scene-veil" style={{ opacity: sceneVeilOpacity }} />
        <HeroOverlay progress={progress} showHero={phaseState.showHero} />
        <WorldTitleOverlay
          activeWorld={activeWorld}
          progress={progress}
          phaseState={phaseState}
          selectedWorldId={selectedWorldId}
          drawerOpen={drawerOpen}
          onOpenWorld={(worldId) => {
            haptics.pulse(12);
            setSelectedWorldId(worldId);
          }}
        />
        <HUD
          progress={progress}
          activeWorld={activeWorld}
          selectedWorld={selectedWorld}
          featuredWorlds={featuredWorlds}
          onSelectWorld={setSelectedWorldId}
          onSetDrawerOpen={setDrawerOpen}
          drawerOpen={drawerOpen}
          sound={sound}
          haptics={haptics}
          sensor={sensor}
          phaseState={phaseState}
          isMobile={isMobile}
        />
        <WorldDetailPanel world={selectedWorld} onClose={() => setSelectedWorldId(null)} />
        <RecoloredCursor accent={activeWorld.colors.accent} />
      </div>
    </main>
  );
}

export default App;
