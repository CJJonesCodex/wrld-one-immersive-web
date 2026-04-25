import type { VfxPreset } from '../data/worldVfxPresets';
import type { WorldRevealRuntime } from '../types/reveal';
import type { FeaturedWorld, QualityLevel } from '../types/world';
import { LivingMacroWorld } from './worlds/LivingMacroWorld';
import { SignalGardenWorld } from './worlds/SignalGardenWorld';
import { CoreChamberWorld } from './worlds/CoreChamberWorld';
import { AuroraPassageWorld } from './worlds/AuroraPassageWorld';
import { RiftBloomWorld } from './worlds/RiftBloomWorld';
import { FutureWorld } from './worlds/FutureWorld';
import type { VisualContinuityState } from '../systems/useVisualContinuity';

interface WorldRevealStageProps {
  activeWorld: FeaturedWorld;
  revealRuntime: WorldRevealRuntime;
  vfxPreset: VfxPreset;
  continuity: VisualContinuityState;
  quality: QualityLevel;
  isMobileFit: boolean;
  reducedMotion: boolean;
  drawerOpen: boolean;
  detailOpen: boolean;
}

export function WorldRevealStage({ activeWorld, revealRuntime, quality, isMobileFit, reducedMotion, continuity, drawerOpen, detailOpen }: WorldRevealStageProps) {
  if (!continuity.showWorldReveal && continuity.showHero) return null;

  const opacityFloor = revealRuntime.phase === 'revealed' || revealRuntime.phase === 'exit' ? 0.75 : 0.1;
  const overlayFloor = drawerOpen || detailOpen ? 0.16 : 0;
  const opacity = Math.max(overlayFloor, Math.max(opacityFloor, continuity.revealOpacity));
  const scale = isMobileFit ? 0.84 : 1;

  const shared = {
    opacity,
    quality,
    isMobileFit,
    reducedMotion,
  };

  let worldNode: JSX.Element | null = null;
  switch (activeWorld.id) {
    case 'living-macro':
      worldNode = <LivingMacroWorld {...shared} objectCount={quality === 'low' ? 18 : quality === 'medium' ? 28 : 42} />;
      break;
    case 'signal-garden':
      worldNode = <SignalGardenWorld {...shared} objectCount={quality === 'low' ? 16 : quality === 'medium' ? 26 : 40} />;
      break;
    case 'core-chamber':
      worldNode = <CoreChamberWorld {...shared} objectCount={quality === 'low' ? 12 : quality === 'medium' ? 20 : 34} />;
      break;
    case 'aurora-passage':
      worldNode = <AuroraPassageWorld {...shared} objectCount={quality === 'low' ? 10 : quality === 'medium' ? 18 : 26} />;
      break;
    case 'rift-bloom':
      worldNode = <RiftBloomWorld {...shared} objectCount={quality === 'low' ? 12 : quality === 'medium' ? 20 : 30} />;
      break;
    case 'future-world':
      worldNode = <FutureWorld {...shared} objectCount={quality === 'low' ? 24 : quality === 'medium' ? 36 : 60} />;
      break;
    default:
      worldNode = null;
      break;
  }

  if (!worldNode) return null;
  return <group scale={scale}>{worldNode}</group>;
}
