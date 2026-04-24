import { useMemo } from 'react';
import { featuredWorlds } from '../data/featuredWorlds';
import { PremiumGlassCard } from './PremiumGlassCard';
import type { QualityConfig } from '../systems/useQuality';

interface MediaPlanesProps {
  quality: QualityConfig;
  activeIndex: number;
  onSelectCore: () => void;
}

export function MediaPlanes({ quality, activeIndex, onSelectCore }: MediaPlanesProps) {
  const coreWorld = useMemo(() => featuredWorlds[2], []);
  const ghostWorld = useMemo(() => featuredWorlds[3], []);

  return (
    <group>
      <PremiumGlassCard world={coreWorld} isActive={activeIndex === 2} media={null} onSelect={onSelectCore} />
      {quality.level !== 'low' ? (
        <PremiumGlassCard world={ghostWorld} isActive={false} media={null} onSelect={onSelectCore} zOffset={8} />
      ) : null}
    </group>
  );
}
