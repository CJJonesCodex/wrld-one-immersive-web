import { CameraRig } from './CameraRig';
import { GradientAtmosphere } from './GradientAtmosphere';
import { DepthMist } from './DepthMist';
import { WorldOrbs } from './WorldOrbs';
import { ThinRibbons } from './ThinRibbons';
import { FeaturedWorldRail } from './FeaturedWorldRail';
import { RiftBloom } from './RiftBloom';
import { WorldVFXStage } from './WorldVFXStage';
import type { FeaturedWorld, QualityLevel, WorldId } from '../types/world';
import type { PointerIntent } from '../systems/usePointerIntent';
import type { DeviceSensorState } from '../systems/useDeviceSensor';
import type { HapticsState } from '../systems/useHaptics';
import type { ScenePhaseState } from '../systems/useScenePhase';
import { DEFAULT_VISUAL_MODE } from '../config/visualMode';
import type { WorldRevealRuntime } from '../types/reveal';
import type { VfxPreset } from '../data/worldVfxPresets';
import { getWorldRevealPreset } from '../data/worldRevealPresets';
import { TitleBreakParticles } from './TitleBreakParticles';
import { WorldRevealStage } from './WorldRevealStage';
import type { VisualContinuityState } from '../systems/useVisualContinuity';

interface WorldProps {
  progress: number;
  activeWorld: FeaturedWorld;
  selectedWorldId: WorldId | null;
  quality: QualityLevel;
  pointer: PointerIntent;
  sensor: DeviceSensorState;
  onSelectWorld: (worldId: WorldId) => void;
  haptics: HapticsState;
  worlds: FeaturedWorld[];
  reducedMotion: boolean;
  phaseState: ScenePhaseState;
  mobileDrawerOpen: boolean;
  detailOpen: boolean;
  isMobile: boolean;
  isMobileFit: boolean;
  revealRuntime: WorldRevealRuntime;
  vfxPreset: VfxPreset;
  continuity: VisualContinuityState;
}

export function World({
  progress,
  activeWorld,
  quality,
  pointer,
  sensor,
  onSelectWorld,
  haptics,
  worlds,
  reducedMotion,
  phaseState,
  mobileDrawerOpen,
  detailOpen,
  isMobile,
  isMobileFit,
  revealRuntime,
  vfxPreset,
  continuity,
}: WorldProps) {
  const titleVfxMode = DEFAULT_VISUAL_MODE === 'title-vfx';
  const hideSilhouetteHtml = detailOpen || (isMobile && mobileDrawerOpen) || titleVfxMode;
  const revealPreset = getWorldRevealPreset(activeWorld.id);

  return (
    <>
      <color attach="background" args={['#fff8ec']} />
      <fog attach="fog" args={['#fff8ec', 7, 22]} />
      <ambientLight intensity={0.74} />
      <directionalLight position={[5, 6, 7]} intensity={1.05} color="#fff6dc" />
      <CameraRig progress={progress} pointer={pointer} sensor={sensor} activeWorld={activeWorld} reducedMotion={reducedMotion} />
      <GradientAtmosphere activeWorld={activeWorld} progress={progress} quality={quality} />
      <DepthMist quality={quality} activeWorld={activeWorld} />
      <WorldOrbs activeWorld={activeWorld} quality={quality} />
      <ThinRibbons activeWorld={activeWorld} quality={quality} />
      {titleVfxMode && (
        <>
          {/* Phase 5.12: WebGL reveal layers remain active but are secondary to the DOM screen-space visibility lock. */}
          <WorldVFXStage
            activeWorld={activeWorld}
            progress={progress}
            phaseState={phaseState}
            quality={quality}
            reducedMotion={reducedMotion}
            drawerOpen={mobileDrawerOpen}
            detailOpen={detailOpen}
          />
          <WorldRevealStage
            activeWorld={activeWorld}
            revealRuntime={revealRuntime}
            vfxPreset={vfxPreset}
            continuity={continuity}
            quality={quality}
            isMobileFit={isMobileFit}
            reducedMotion={reducedMotion}
            drawerOpen={mobileDrawerOpen}
            detailOpen={detailOpen}
          />
          <TitleBreakParticles
            activeWorld={activeWorld}
            revealPreset={revealPreset}
            revealRuntime={revealRuntime}
            continuity={continuity}
            vfxPreset={vfxPreset}
            quality={quality}
            isMobileFit={isMobileFit}
            reducedMotion={reducedMotion}
          />
        </>
      )}
      <FeaturedWorldRail
        worlds={worlds}
        activeWorld={activeWorld}
        progress={progress}
        quality={quality}
        onSelectWorld={onSelectWorld}
        haptics={haptics}
        showCardLabels={!hideSilhouetteHtml && phaseState.phase !== 'hero' && phaseState.showCardLabels}
        showCardViewButtons={!hideSilhouetteHtml && !titleVfxMode && phaseState.phase !== 'hero' && phaseState.showCardViewButtons}
        phase={phaseState.phase}
        mobileDrawerOpen={mobileDrawerOpen}
        detailOpen={detailOpen}
        isMobile={isMobile}
        visualMode={DEFAULT_VISUAL_MODE}
      />
      <RiftBloom progress={progress} activeWorld={activeWorld} quality={quality} />
    </>
  );
}
