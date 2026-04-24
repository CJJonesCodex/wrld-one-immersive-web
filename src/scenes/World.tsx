import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { Particles } from './Particles';
import { Hotspots } from './Hotspots';
import { MediaPlanes } from './MediaPlanes';
import { FeaturedWorldRail } from './FeaturedWorldRail';
import { DepthMist } from './DepthMist';
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
      <color attach="background" args={['#030305']} />
      <fog attach="fog" args={['#050509', 12, 260]} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[4, 7, -20]} color="#ccd7e4" intensity={0.7 * quality.glowIntensity} />
      <pointLight position={[0, 3, -110]} color="#6d89a2" intensity={0.5 * quality.glowIntensity} distance={52} />

      <Suspense fallback={null}>
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
