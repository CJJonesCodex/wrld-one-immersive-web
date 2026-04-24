import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { ZoneInfo } from '../components/HUD';
import { CameraRig } from './CameraRig';
import { Hotspots } from './Hotspots';
import { Particles } from './Particles';
import { ZoneObjects } from './ZoneObjects';
import type { QualityConfig } from '../systems/useQuality';

interface WorldProps {
  progress: number;
  quality: QualityConfig;
  onSelectZone: (zone: ZoneInfo) => void;
  onReady: () => void;
}

export function World({ progress, quality, onSelectZone, onReady }: WorldProps) {
  return (
    <Canvas
      className="world-canvas"
      camera={{ position: [0, 1.8, 8], fov: 54, near: 0.1, far: 400 }}
      dpr={[1, quality.dpr]}
      gl={{ antialias: quality.antialias, powerPreference: 'high-performance' }}
      onCreated={onReady}
    >
      <color attach="background" args={['#03040b']} />
      <fog attach="fog" args={['#05050d', 10, 220]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 8, 2]} color="#86cfff" intensity={1.2} />
      <directionalLight position={[-5, 6, -20]} color="#8e70ff" intensity={0.85} />

      <Suspense fallback={null}>
        <Environment preset="night" />
        <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.3}>
          <ZoneObjects detailedGrid={quality.enableGridDetail} />
        </Float>
        <Particles count={quality.particleCount} />
        <Hotspots onSelect={onSelectZone} />
      </Suspense>

      <CameraRig progress={progress} />
    </Canvas>
  );
}
