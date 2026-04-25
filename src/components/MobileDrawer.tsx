import { useEffect } from 'react';
import type { WorldId, FeaturedWorld } from '../types/world';
import type { AmbientSoundState } from '../systems/useAmbientSound';
import type { DeviceSensorState } from '../systems/useDeviceSensor';
import type { HapticsState } from '../systems/useHaptics';
import type { ViewportMode } from '../systems/useViewportMode';
import { FeaturedWorksIndex } from './FeaturedWorksIndex';
import { SensoryControls } from './SensoryControls';
import { ViewModeButton } from './ViewModeButton';

interface MobileDrawerProps {
  open: boolean;
  worlds: FeaturedWorld[];
  activeWorldId: WorldId;
  onClose: () => void;
  onNavigate: (worldId: WorldId) => void;
  sound: AmbientSoundState;
  haptics: HapticsState;
  sensor: DeviceSensorState;
  activeAccent: string;
  viewportMode: ViewportMode;
  onToggleViewportMode: () => void;
  showViewportToggle: boolean;
}

export function MobileDrawer({ open, worlds, activeWorldId, onClose, onNavigate, sound, haptics, sensor, activeAccent, viewportMode, onToggleViewportMode, showViewportToggle }: MobileDrawerProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <>
      {open && <button className="mobile-backdrop" onClick={onClose} aria-label="Close menu" />}
      <aside className={`mobile-drawer ${open ? 'is-open' : ''}`}>
        {showViewportToggle && <ViewModeButton mode={viewportMode} onToggle={onToggleViewportMode} compact />}
        <SensoryControls sound={sound} haptics={haptics} sensor={sensor} activeAccent={activeAccent} compact />
        <FeaturedWorksIndex
          worlds={worlds}
          activeWorldId={activeWorldId}
          onNavigate={(id) => {
            onNavigate(id);
            onClose();
          }}
          variant="mobile"
        />
      </aside>
    </>
  );
}
