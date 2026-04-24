import type { FeaturedWorld, QualityLevel, WorldId } from '../types/world';
import { getActiveStrength } from '../utils/math';
import { PremiumGlassCard } from './PremiumGlassCard';
import type { HapticsState } from '../systems/useHaptics';
import type { VisualMode } from '../config/visualMode';

interface FeaturedWorldRailProps {
  worlds: FeaturedWorld[];
  activeWorld: FeaturedWorld;
  progress: number;
  quality: QualityLevel;
  onSelectWorld: (worldId: WorldId) => void;
  haptics: HapticsState;
  showCardLabels: boolean;
  showCardViewButtons: boolean;
  phase: 'hero' | 'intro' | 'rail' | 'focus' | 'bloom';
  mobileDrawerOpen: boolean;
  detailOpen: boolean;
  isMobile: boolean;
  visualMode: VisualMode;
}

export function FeaturedWorldRail({ worlds, activeWorld, progress, quality, onSelectWorld, haptics, showCardLabels, showCardViewButtons, phase, mobileDrawerOpen, detailOpen, isMobile, visualMode }: FeaturedWorldRailProps) {
  const maxNearActive = quality === 'high' ? 2 : quality === 'medium' ? 1 : 0;
  const nearActive = worlds
    .filter((world) => world.id !== activeWorld.id)
    .map((world) => ({ world, strength: getActiveStrength(progress, world.scene.focusRange) }))
    .filter((item) => item.strength > 0.34)
    .sort((a, b) => b.strength - a.strength)
    .slice(0, maxNearActive)
    .map((item) => item.world.id);

  const hideHtml = detailOpen || (isMobile && mobileDrawerOpen);

  return (
    <group>
      {worlds.map((world) => {
        const activeStrength = getActiveStrength(progress, world.scene.focusRange);
        const isActive = world.id === activeWorld.id;
        const isNearActive = nearActive.includes(world.id);

        return (
          <PremiumGlassCard
            key={world.id}
            world={world}
            activeWorldId={activeWorld.id}
            activeStrength={activeStrength}
            isActive={isActive}
            isNearActive={isNearActive || phase === 'hero'}
            quality={quality}
            allowVideo={visualMode === 'media-cards' && quality !== 'low' && (isActive || isNearActive)}
            showLabels={!hideHtml && visualMode === 'media-cards' && phase !== 'hero' && showCardLabels && (!isMobile || isActive)}
            showViewButton={!hideHtml && visualMode === 'media-cards' && phase !== 'hero' && showCardViewButtons}
            onSelect={onSelectWorld}
            haptics={haptics}
            visualMode={visualMode}
            phase={phase}
          />
        );
      })}
    </group>
  );
}
