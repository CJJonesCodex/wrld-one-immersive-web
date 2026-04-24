import { featuredWorlds } from '../data/featuredWorlds';
import type { FeaturedWorld, QualityLevel, WorldId } from '../types/world';
import { getActiveStrength } from '../utils/math';
import { PremiumGlassCard } from './PremiumGlassCard';
import type { HapticsState } from '../systems/useHaptics';

interface FeaturedWorldRailProps {
  worlds: FeaturedWorld[];
  activeWorld: FeaturedWorld;
  progress: number;
  quality: QualityLevel;
  onSelectWorld: (worldId: WorldId) => void;
  haptics: HapticsState;
}

export function FeaturedWorldRail({ worlds, activeWorld, progress, quality, onSelectWorld, haptics }: FeaturedWorldRailProps) {
  const activeNear = worlds.filter((world) => getActiveStrength(progress, world.scene.focusRange) > 0.35).slice(0, quality === 'high' ? 2 : 1);

  return (
    <group>
      {worlds.map((world) => {
        const activeStrength = getActiveStrength(progress, world.scene.focusRange);
        const active = world.id === activeWorld.id;
        const nearActive = activeStrength > 0.35;
        const allowVideo = quality !== 'low' && (active || activeNear.some((near) => near.id === world.id));
        return (
          <PremiumGlassCard
            key={world.id}
            world={world}
            activeStrength={activeStrength}
            active={active}
            nearActive={nearActive}
            quality={quality}
            allowVideo={allowVideo}
            onSelect={onSelectWorld}
            haptics={haptics}
          />
        );
      })}
    </group>
  );
}

export { featuredWorlds };
