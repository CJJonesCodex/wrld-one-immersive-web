import { CameraRig } from './CameraRig';
import { GradientAtmosphere } from './GradientAtmosphere';
import { DepthMist } from './DepthMist';
import { WorldOrbs } from './WorldOrbs';
import { ThinRibbons } from './ThinRibbons';
import { FeaturedWorldRail } from './FeaturedWorldRail';
import { RiftBloom } from './RiftBloom';
import type { FeaturedWorld, QualityLevel, WorldId } from '../types/world';
import type { PointerIntent } from '../systems/usePointerIntent';
import type { DeviceSensorState } from '../systems/useDeviceSensor';
import type { HapticsState } from '../systems/useHaptics';
import type { ScenePhase } from '../systems/useScenePhase';

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
  showCardLabels: boolean;
  showCardViewButtons: boolean;
  phase: ScenePhase;
  mobileDrawerOpen: boolean;
  detailOpen: boolean;
  isMobile: boolean;
}

export function World({ progress, activeWorld, quality, pointer, sensor, onSelectWorld, haptics, worlds, reducedMotion, showCardLabels, showCardViewButtons, phase, mobileDrawerOpen, detailOpen, isMobile }: WorldProps) {
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
      <FeaturedWorldRail
        worlds={worlds}
        activeWorld={activeWorld}
        progress={progress}
        quality={quality}
        onSelectWorld={onSelectWorld}
        haptics={haptics}
        showCardLabels={showCardLabels}
        showCardViewButtons={showCardViewButtons}
        phase={phase}
        mobileDrawerOpen={mobileDrawerOpen}
        detailOpen={detailOpen}
        isMobile={isMobile}
      />
      <RiftBloom progress={progress} activeWorld={activeWorld} quality={quality} />
    </>
  );
}
