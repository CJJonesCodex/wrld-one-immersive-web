import { Canvas } from '@react-three/fiber';
import { useEffect, useMemo, useState } from 'react';
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
import type { WorldId } from './types/world';
import { useReducedMotion } from './systems/useReducedMotion';
import { getScenePhase } from './systems/useScenePhase';
import { getWorldVfxPreset } from './data/worldVfxPresets';
import { useWorldRevealRuntime } from './systems/useWorldRevealRuntime';
import { useViewportMode } from './systems/useViewportMode';
import { ViewportModeToggle } from './components/ViewportModeToggle';
import { getVisualContinuityState } from './systems/useVisualContinuity';
import { ScreenSpaceWorldReveal } from './components/ScreenSpaceWorldReveal';
import { logContinuityWarnings } from './utils/devWarnings';
import { StableWorldTitle } from './components/StableWorldTitle';

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

  const selectedWorld = useMemo(() => (selectedWorldId ? getWorldById(selectedWorldId) ?? null : null), [selectedWorldId]);
  const phaseState = getScenePhase(progress, viewportMode.isPhoneViewport);
  const revealRuntime = useWorldRevealRuntime({ activeWorld, progress });
  const continuity = getVisualContinuityState({
    progress,
    scenePhase: phaseState.phase,
    revealPhase: revealRuntime.phase,
    breakProgress: revealRuntime.breakProgress,
    revealProgress: revealRuntime.revealProgress,
    exitProgress: revealRuntime.exitProgress,
    drawerOpen,
    detailOpen: Boolean(selectedWorld),
  });
  const activePreset = getWorldVfxPreset(activeWorld.id);

  useEffect(() => {
    logContinuityWarnings({
      continuity,
      scenePhase: phaseState.phase,
      viewportMode: viewportMode.mode,
      activeWorld,
    });
  }, [activeWorld, continuity, phaseState.phase, viewportMode.mode]);

  const sceneVeilOpacity = selectedWorld ? 0.28 : drawerOpen ? 0.22 : phaseState.showHero ? 0.18 : 0;

  return (
    <main className={`site-shell site-shell--${viewportMode.mode}`} data-viewport-mode={viewportMode.mode}>
      <div className="scroll-space" aria-hidden="true" />
      <div className="canvas-layer">
        <Canvas className="world-canvas" dpr={[1, quality.dpr]} gl={{ antialias: quality.antialias, powerPreference: 'high-performance', alpha: true }} camera={{ near: 0.1, far: 60, fov: viewportMode.isPhoneViewport ? 46 : 42 }}>
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
            isMobile={viewportMode.isPhoneViewport}
            isMobileFit={viewportMode.isMobileFit}
            revealRuntime={revealRuntime}
            vfxPreset={activePreset}
            continuity={continuity}
          />
        </Canvas>
      </div>

      <div className="hud-layer">
        <div className="scene-veil" style={{ opacity: sceneVeilOpacity }} />
        <ScreenSpaceWorldReveal
          activeWorld={activeWorld}
          continuity={continuity}
          revealRuntime={revealRuntime}
          isMobileFit={viewportMode.isMobileFit}
          drawerOpen={drawerOpen}
          detailOpen={Boolean(selectedWorld)}
        />
        <HeroOverlay progress={progress} showHero={phaseState.showHero} />
        <StableWorldTitle
          activeWorld={activeWorld}
          preset={activePreset}
          progress={progress}
          phase={phaseState.phase}
          revealRuntime={revealRuntime}
          continuity={continuity}
          isMobileFit={viewportMode.isMobileFit}
          drawerOpen={drawerOpen}
          detailOpen={Boolean(selectedWorld)}
          selectedWorldId={selectedWorldId}
          onView={() => {
            haptics.pulse(12);
            setSelectedWorldId(activeWorld.id);
          }}
        />
        {!phaseState.showHero && viewportMode.showStandaloneToggle && (
          <div className="viewport-mode-toggle-wrap">
            <ViewportModeToggle mode={viewportMode.mode} onToggle={viewportMode.toggleMode} />
          </div>
        )}
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
          isMobile={viewportMode.isPhoneViewport}
          viewportMode={viewportMode.mode}
          isMobileFit={viewportMode.isMobileFit}
          showStandaloneToggle={viewportMode.showStandaloneToggle}
          onToggleViewportMode={viewportMode.toggleMode}
        />
        <WorldDetailPanel world={selectedWorld} onClose={() => setSelectedWorldId(null)} />
        <RecoloredCursor accent={activeWorld.colors.accent} />
      </div>
    </main>
  );
}

export default App;
