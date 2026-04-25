import { useMemo } from 'react';
import type { FeaturedWorld, WorldId } from '../types/world';
import { FeaturedWorksIndex } from './FeaturedWorksIndex';
import { ScrollbarNav } from './ScrollbarNav';
import { SensoryControls } from './SensoryControls';
import { ActiveWorldReadout } from './ActiveWorldReadout';
import { AudioVisualizer } from './AudioVisualizer';
import { MobileDrawer } from './MobileDrawer';
import type { AmbientSoundState } from '../systems/useAmbientSound';
import type { HapticsState } from '../systems/useHaptics';
import type { DeviceSensorState } from '../systems/useDeviceSensor';
import type { ScenePhaseState } from '../systems/useScenePhase';
import { scrollToProgress } from '../systems/useScrollProgress';
import { DEFAULT_VISUAL_MODE } from '../config/visualMode';
import type { ViewportMode } from '../systems/useViewportMode';

interface HUDProps {
  progress: number;
  activeWorld: FeaturedWorld;
  selectedWorld: FeaturedWorld | null;
  featuredWorlds: FeaturedWorld[];
  onSelectWorld: (worldId: WorldId) => void;
  onSetDrawerOpen: (open: boolean) => void;
  drawerOpen: boolean;
  sound: AmbientSoundState;
  haptics: HapticsState;
  sensor: DeviceSensorState;
  phaseState: ScenePhaseState;
  isMobile: boolean;
  viewportMode: ViewportMode;
  isMobileFit: boolean;
  showStandaloneToggle: boolean;
  onToggleViewportMode: () => void;
}

export function HUD({
  progress,
  activeWorld,
  selectedWorld,
  featuredWorlds,
  onSelectWorld,
  onSetDrawerOpen,
  drawerOpen,
  sound,
  haptics,
  sensor,
  phaseState,
  isMobile,
  viewportMode,
  isMobileFit,
  showStandaloneToggle,
  onToggleViewportMode,
}: HUDProps) {
  const nav = useMemo(
    () => [
      { label: 'Top', target: 0 },
      { label: 'Worlds', target: 0.28 },
      { label: 'Signal', target: 0.4 },
      { label: 'Contact', target: 0.94 },
    ],
    [],
  );

  const detailOpen = Boolean(selectedWorld);
  const titleVfxMode = DEFAULT_VISUAL_MODE === 'title-vfx';
  const showDesktopIndex = !titleVfxMode && !isMobile && phaseState.showFeaturedIndex && !detailOpen;
  const showReadout = !titleVfxMode && phaseState.showActiveReadout && !(isMobile && (drawerOpen || detailOpen));
  const showScrollbar = phaseState.showScrollbarNav && !(isMobile && (drawerOpen || detailOpen));

  return (
    <>
      <div className="global-brand">
        <div>WRLD ONE</div>
        {!isMobile && <div>SPATIAL WORKS</div>}
      </div>

      {!isMobile && (
        <div className="top-nav">
          {nav.map((item) => (
            <button key={item.label} className={`top-nav__item ${Math.abs(progress - item.target) < 0.08 ? 'is-active' : ''}`} onClick={() => scrollToProgress(item.target)} aria-label={`Go to ${item.label}`}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <button className="sensory-button hud-mobile-menu" onClick={() => onSetDrawerOpen(!drawerOpen)} aria-label="Toggle mobile menu">
        {drawerOpen ? 'Close' : 'Menu'}
      </button>

      {!isMobile && !phaseState.showHero && (
        <div className="sensory-controls-wrap">
          <SensoryControls sound={sound} haptics={haptics} sensor={sensor} activeAccent={activeWorld.colors.accent} />
        </div>
      )}

      {showDesktopIndex && <FeaturedWorksIndex worlds={featuredWorlds} activeWorldId={activeWorld.id} onNavigate={onSelectWorld} />}
      {showScrollbar && (
        <ScrollbarNav worlds={featuredWorlds} activeWorldId={activeWorld.id} progress={progress} onNavigate={onSelectWorld} orientation={isMobile ? 'horizontal' : 'vertical'} isMobileFit={isMobileFit} />
      )}
      {showReadout && <ActiveWorldReadout world={activeWorld} progress={progress} isMobile={isMobile} isMobileFit={isMobileFit} />}

      <AudioVisualizer enabled={sound.enabled && !phaseState.showHero && !drawerOpen && !detailOpen} accent={activeWorld.colors.accent} />

      <MobileDrawer
        open={drawerOpen && !phaseState.showHero}
        worlds={featuredWorlds}
        activeWorldId={activeWorld.id}
        onClose={() => onSetDrawerOpen(false)}
        onNavigate={onSelectWorld}
        sound={sound}
        haptics={haptics}
        sensor={sensor}
        activeAccent={activeWorld.colors.accent}
        viewportMode={viewportMode}
        showViewportToggleInside={!showStandaloneToggle && isMobile}
        onToggleViewportMode={onToggleViewportMode}
      />
    </>
  );
}
