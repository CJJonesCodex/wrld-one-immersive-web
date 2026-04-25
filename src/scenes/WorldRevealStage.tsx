import { getWorldRevealPreset } from '../data/worldRevealPresets';
import type { VfxPreset } from '../data/worldVfxPresets';
import type { WorldRevealRuntime } from '../types/reveal';
import type { FeaturedWorld, QualityLevel } from '../types/world';
import type { VisualContinuityState } from '../systems/visualContinuity';
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
  continuity: VisualContinuityState;
  quality: QualityLevel;
  isMobileFit: boolean;
  reducedMotion: boolean;
  drawerOpen?: boolean;
  detailOpen?: boolean;
}

export function WorldRevealStage({ activeWorld, revealRuntime, continuity, quality, isMobileFit, reducedMotion, drawerOpen = false, detailOpen = false }: WorldRevealStageProps) {
  if (!continuity.showWorldReveal) return null;

  const revealPreset = getWorldRevealPreset(activeWorld.id);
  const baseCount = revealPreset.worldObjectCount[quality];
  const mobileScale = isMobileFit ? Math.max(0.78, revealPreset.mobileDensityScale) : 1;
  const objectCount = Math.max(isMobileFit ? 8 : 12, Math.floor(baseCount * mobileScale));
  const dimmer = drawerOpen || detailOpen ? 0.42 : 1;
  const runtimeBoost = revealRuntime.phase === 'revealed' || revealRuntime.phase === 'exit' ? 0.75 : 0;
  const opacity = Math.max(continuity.revealOpacity, runtimeBoost) * dimmer;

  if (opacity <= 0.001) return null;

  switch (activeWorld.id) {
    case 'living-macro':
      return <LivingMacroWorld opacity={opacity} objectCount={Math.max(objectCount, isMobileFit ? 18 : 24)} quality={quality} isMobileFit={isMobileFit} reducedMotion={reducedMotion} />;
    case 'signal-garden':
      return <SignalGardenWorld opacity={opacity} objectCount={Math.max(objectCount, isMobileFit ? 24 : 32)} quality={quality} isMobileFit={isMobileFit} reducedMotion={reducedMotion} />;
    case 'core-chamber':
      return <CoreChamberWorld opacity={opacity} objectCount={Math.max(objectCount, isMobileFit ? 18 : 24)} quality={quality} isMobileFit={isMobileFit} reducedMotion={reducedMotion} />;
    case 'aurora-passage':
      return <AuroraPassageWorld opacity={opacity} objectCount={Math.max(objectCount, isMobileFit ? 14 : 20)} quality={quality} isMobileFit={isMobileFit} reducedMotion={reducedMotion} />;
    case 'rift-bloom':
      return <RiftBloomWorld opacity={opacity} objectCount={Math.max(objectCount, isMobileFit ? 12 : 18)} quality={quality} isMobileFit={isMobileFit} reducedMotion={reducedMotion} />;
    case 'future-world':
      return <FutureWorld opacity={opacity} objectCount={Math.max(objectCount, isMobileFit ? 32 : 48)} quality={quality} isMobileFit={isMobileFit} reducedMotion={reducedMotion} />;
    default:
      return null;
  }
}
