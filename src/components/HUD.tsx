import { useMemo, useState } from 'react';
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
import { scrollToProgress } from '../constants/scrollMap';

interface HUDProps {
  progress: number;
  activeWorld: FeaturedWorld;
  selectedWorld: FeaturedWorld | null;
  featuredWorlds: FeaturedWorld[];
  onSelectWorld: (worldId: WorldId) => void;
  onCloseWorld: () => void;
  onNavigateToWorld: (worldId: WorldId) => void;
  sound: AmbientSoundState;
  haptics: HapticsState;
  sensor: DeviceSensorState;
}

export function HUD({ progress, activeWorld, featuredWorlds, onNavigateToWorld, sound, haptics, sensor }: HUDProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const nav = useMemo(
    () => [
      { label: 'Top', target: 0 },
      { label: 'Worlds', target: 0.2 },
      { label: 'Signal', target: 0.4 },
      { label: 'Contact', target: 0.94 },
    ],
    [],
  );

  return (
    <>
      <div className="global-brand">WRLD ONE</div>
      <div className="top-nav">
        {nav.map((item) => (
          <button key={item.label} className={`top-nav__item ${Math.abs(progress - item.target) < 0.1 ? 'is-active' : ''}`} onClick={() => scrollToProgress(item.target)} aria-label={`Go to ${item.label}`}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="hud-desktop sensory-controls-wrap"><SensoryControls sound={sound} haptics={haptics} sensor={sensor} activeAccent={activeWorld.colors.accent} /></div>
      <FeaturedWorksIndex worlds={featuredWorlds} activeWorldId={activeWorld.id} onNavigate={onNavigateToWorld} />
      <ScrollbarNav worlds={featuredWorlds} activeWorldId={activeWorld.id} progress={progress} onNavigate={onNavigateToWorld} />
      <ActiveWorldReadout world={activeWorld} progress={progress} />
      <AudioVisualizer enabled={sound.enabled} accent={activeWorld.colors.accent} />
      <button className="top-nav__item hud-mobile-menu" onClick={() => setDrawerOpen((v) => !v)} aria-label="Open mobile menu">Menu</button>
      <MobileDrawer
        open={drawerOpen}
        worlds={featuredWorlds}
        activeWorldId={activeWorld.id}
        onClose={() => setDrawerOpen(false)}
        onNavigate={(id) => { onNavigateToWorld(id); setDrawerOpen(false); }}
        sound={sound}
        haptics={haptics}
        sensor={sensor}
        activeAccent={activeWorld.colors.accent}
      />
    </>
  );
}
