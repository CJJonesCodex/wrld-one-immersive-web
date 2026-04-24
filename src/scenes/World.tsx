import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { Particles } from './Particles';
import { Hotspots } from './Hotspots';
import { MediaPlanes } from './MediaPlanes';
import { FeaturedWorldRail } from './FeaturedWorldRail';
import { DepthMist } from './DepthMist';
import { GradientAtmosphere } from './GradientAtmosphere';
import { WorldOrbs } from './WorldOrbs';
import type { QualityConfig } from '../systems/useQuality';

interface WorldProps {
  progress: number;
  activeIndex: number;
  quality: QualityConfig;
  sensorOffset: { x: number; y: number };
  soundOn: boolean;
  onSelectWorld: (index: number) => void;
  onReady: () => void;
}

export function World({ progress, activeIndex, quality, sensorOffset, soundOn, onSelectWorld, onReady }: WorldProps) {
  return (
    <Canvas
      className="world-canvas"
      camera={{ position: [0, 1.8, 8], fov: 47, near: 0.1, far: 360 }}
      dpr={[1, quality.dpr]}
      gl={{ antialias: quality.antialias, powerPreference: 'high-performance' }}
      onCreated={onReady}
    >
      <color attach="background" args={['#f6f7ff']} />
      <fog attach="fog" args={['#f8f1ff', 24, 280]} />
      <ambientLight intensity={0.62} />
      <directionalLight position={[5, 8, -14]} color="#ffe7bf" intensity={1.05 * quality.glowIntensity} />
      <pointLight position={[-4, 4, -112]} color="#b0e3ff" intensity={0.9 * quality.glowIntensity} distance={160} />
      <pointLight position={[2, 3, -175]} color="#ffc6de" intensity={0.55 * quality.glowIntensity} distance={120} />

      <Suspense fallback={null}>
        <GradientAtmosphere />
        <WorldOrbs />
        <DepthMist />
        <Particles count={quality.particleCount} />
        <FeaturedWorldRail
          progress={progress}
          activeIndex={activeIndex}
          quality={quality}
          soundReactive={soundOn}
          onSelectWorld={onSelectWorld}
        />
        <MediaPlanes quality={quality} activeIndex={activeIndex} onSelectCore={() => onSelectWorld(2)} />
        <Hotspots onSelect={() => onSelectWorld(2)} />
      </Suspense>

      <CameraRig progress={progress} sensorOffset={sensorOffset} />
    </Canvas>
  );
}
