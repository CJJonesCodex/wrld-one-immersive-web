import { getWorldRevealPreset } from '../data/worldRevealPresets';
import type { VfxPreset } from '../data/worldVfxPresets';
import type { WorldRevealRuntime } from '../types/reveal';
import type { FeaturedWorld, QualityLevel } from '../types/world';
import { LivingMacroWorld } from './worlds/LivingMacroWorld';
import { SignalGardenWorld } from './worlds/SignalGardenWorld';
import { CoreChamberWorld } from './worlds/CoreChamberWorld';
import { AuroraPassageWorld } from './worlds/AuroraPassageWorld';
import { RiftBloomWorld } from './worlds/RiftBloomWorld';
import { FutureWorld } from './worlds/FutureWorld';

interface WorldRevealStageProps {
  activeWorld: FeaturedWorld;
  revealRuntime: WorldRevealRuntime;
  vfxPreset: VfxPreset;
  quality: QualityLevel;
  isMobileFit: boolean;
  reducedMotion: boolean;
  drawerOpen?: boolean;
  detailOpen?: boolean;
}

export function WorldRevealStage({ activeWorld, revealRuntime, quality, isMobileFit, reducedMotion, drawerOpen = false, detailOpen = false }: WorldRevealStageProps) {
  const revealPreset = getWorldRevealPreset(activeWorld.id);
  const baseCount = revealPreset.worldObjectCount[quality];
  const objectCount = isMobileFit ? Math.floor(baseCount * 0.88) : baseCount;
  const introGate = revealRuntime.breakProgress > 0.05 ? 1 : 0;
  const dimmer = drawerOpen || detailOpen ? 0.35 : 1;
  const opacity = introGate * revealRuntime.revealProgress * dimmer;

  if (opacity <= 0.001) return null;

  switch (activeWorld.id) {
    case 'living-macro':
      return <LivingMacroWorld opacity={opacity} objectCount={objectCount} quality={quality} isMobileFit={isMobileFit} reducedMotion={reducedMotion} />;
    case 'signal-garden':
      return <SignalGardenWorld opacity={opacity} objectCount={objectCount} quality={quality} isMobileFit={isMobileFit} reducedMotion={reducedMotion} />;
    case 'core-chamber':
      return <CoreChamberWorld opacity={opacity} objectCount={objectCount} quality={quality} isMobileFit={isMobileFit} reducedMotion={reducedMotion} />;
    case 'aurora-passage':
      return <AuroraPassageWorld opacity={opacity} objectCount={objectCount} quality={quality} isMobileFit={isMobileFit} reducedMotion={reducedMotion} />;
    case 'rift-bloom':
      return <RiftBloomWorld opacity={opacity} objectCount={objectCount} quality={quality} isMobileFit={isMobileFit} reducedMotion={reducedMotion} />;
    case 'future-world':
      return <FutureWorld opacity={opacity} objectCount={objectCount} quality={quality} isMobileFit={isMobileFit} reducedMotion={reducedMotion} />;
    default:
      return null;
  }
}
