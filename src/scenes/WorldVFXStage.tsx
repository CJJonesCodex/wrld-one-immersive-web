import { getActiveStrength } from '../utils/math';
import type { ScenePhaseState } from '../systems/useScenePhase';
import type { FeaturedWorld, QualityLevel } from '../types/world';
import { CoreHaloVFX } from './vfx/CoreHaloVFX';
import { OrganicDewVFX } from './vfx/OrganicDewVFX';
import { SignalGardenVFX } from './vfx/SignalGardenVFX';
import { AuroraRibbonVFX } from './vfx/AuroraRibbonVFX';
import { RiftBloomVFX } from './vfx/RiftBloomVFX';
import { FutureConstellationVFX } from './vfx/FutureConstellationVFX';

interface WorldVFXStageProps {
  activeWorld: FeaturedWorld;
  progress: number;
  phaseState: ScenePhaseState;
  quality: QualityLevel;
  reducedMotion: boolean;
  drawerOpen: boolean;
  detailOpen: boolean;
}

export function WorldVFXStage({ activeWorld, progress, phaseState, quality, reducedMotion, drawerOpen, detailOpen }: WorldVFXStageProps) {
  const activeStrength = getActiveStrength(progress, activeWorld.scene.focusRange);
  const phaseMultiplier = phaseState.phase === 'hero' ? 0.14 : phaseState.phase === 'intro' ? 0.45 : phaseState.phase === 'focus' ? 1 : phaseState.phase === 'bloom' ? 1.08 : 0.85;
  const visibilityMultiplier = detailOpen ? 0.08 : drawerOpen ? 0.18 : 1;
  const strength = activeStrength * phaseMultiplier * visibilityMultiplier;

  switch (activeWorld.id) {
    case 'living-macro':
      return <OrganicDewVFX quality={quality} activeStrength={strength} reducedMotion={reducedMotion} />;
    case 'signal-garden':
      return <SignalGardenVFX quality={quality} activeStrength={strength} reducedMotion={reducedMotion} />;
    case 'core-chamber':
      return <CoreHaloVFX quality={quality} activeStrength={strength} reducedMotion={reducedMotion} />;
    case 'aurora-passage':
      return <AuroraRibbonVFX quality={quality} activeStrength={strength} reducedMotion={reducedMotion} />;
    case 'rift-bloom':
      return <RiftBloomVFX quality={quality} activeStrength={strength} reducedMotion={reducedMotion} progress={progress} />;
    case 'future-world':
      return <FutureConstellationVFX quality={quality} activeStrength={strength} reducedMotion={reducedMotion} progress={progress} />;
    default:
      return null;
  }
}
