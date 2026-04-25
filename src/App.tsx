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
import { WorldDetailPanel } from './components/WorldDetailPanel';
import { RecoloredCursor } from './components/RecoloredCursor';
import { ViewModeButton } from './components/ViewModeButton';
import type { WorldId } from './types/world';
import { useReducedMotion } from './systems/useReducedMotion';
import { getScenePhase } from './systems/useScenePhase';
import { TitlePortalTransition } from './components/TitlePortalTransition';
import { getWorldVfxPreset } from './data/worldVfxPresets';
import { useWorldRevealRuntime } from './systems/useWorldRevealRuntime';
import { useViewportMode } from './systems/useViewportMode';
import { getVisualContinuityState } from './systems/visualContinuity';

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
  const viewportMode = useViewportMode();
  const isMobile = viewportMode.isPhoneViewport;
  const isMobileFit = viewportMode.isMobileFit;

  const selectedWorld = useMemo(() => (selectedWorldId ? getWorldById(selectedWorldId) ?? null : null), [selectedWorldId]);
  const phaseState = getScenePhase(progress, isMobile);
  const revealRuntime = useWorldRevealRuntime({ activeWorld, progress });
  const activePreset = getWorldVfxPreset(activeWorld.id);
  const continuity = getVisualContinuityState({
    scenePhase: phaseState.phase,
    revealPhase: revealRuntime.phase,
    breakProgress: revealRuntime.breakProgress,
    revealProgress: revealRuntime.revealProgress,
    exitProgress: revealRuntime.exitProgress,
    drawerOpen,
    detailOpen: Boolean(selectedWorld),
  });

  const sceneVeilOpacity = selectedWorld ? 0.28 : drawerOpen ? 0.22 : continuity.showHero ? 0.18 : 0;

  return (
    <main className={`site-shell site-shell--${viewportMode.mode}`} data-viewport-mode={viewportMode.mode}>
      <div className="scroll-space" aria-hidden="true" />
      <div className="canvas-layer">
        <Canvas className="world-canvas" dpr={[1, quality.dpr]} gl={{ antialias: quality.antialias, powerPreference: 'high-performance', alpha: true }} camera={{ near: 0.1, far: 60, fov: isMobileFit ? 48 : isMobile ? 46 : 42 }}>
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
            isMobileFit={isMobileFit}
            revealRuntime={revealRuntime}
            vfxPreset={activePreset}
            continuity={continuity}
          />
        </Canvas>
      </div>

      <div className="hud-layer">
        <div className="scene-veil" style={{ opacity: sceneVeilOpacity }} />
        <HeroOverlay progress={progress} showHero={continuity.showHero} />
        <TitlePortalTransition
          activeWorld={activeWorld}
          preset={activePreset}
          revealRuntime={revealRuntime}
          continuity={continuity}
          viewportMode={viewportMode.mode}
          isMobileFit={isMobileFit}
          reducedMotion={reducedMotion}
          drawerOpen={drawerOpen}
          detailOpen={Boolean(selectedWorld)}
          phase={phaseState.phase}
          selectedWorldId={selectedWorldId}
          onView={() => {
            haptics.pulse(12);
            setSelectedWorldId(activeWorld.id);
          }}
        />
        {viewportMode.showStandaloneToggle && <div className="viewport-mode-toggle-wrap"><ViewModeButton mode={viewportMode.mode} onToggle={viewportMode.toggleMode} /></div>}
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
          isMobileFit={isMobileFit}
          viewportMode={viewportMode.mode}
          onToggleViewportMode={viewportMode.toggleMode}
          showViewportToggleInDrawer={!viewportMode.showStandaloneToggle}
        />
        <WorldDetailPanel world={selectedWorld} onClose={() => setSelectedWorldId(null)} />
        <RecoloredCursor accent={activeWorld.colors.accent} />
      </div>
    </main>
  );
}

export default App;
