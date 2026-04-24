import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { DirectionalLight } from 'three';
import { ZoneInfo } from '../components/HUD';
import { CameraRig } from './CameraRig';
import { Hotspots } from './Hotspots';
import { Particles } from './Particles';
import { MediaPlanes } from './MediaPlanes';
import { EnvironmentArchitecture } from './EnvironmentArchitecture';
import type { QualityConfig } from '../systems/useQuality';

interface WorldProps {
  progress: number;
  quality: QualityConfig;
  onSelectZone: (zone: ZoneInfo) => void;
  onReady: () => void;
}

function PulseLights({ glowIntensity }: { glowIntensity: number }) {
  const keyRef = useRef<DirectionalLight>(null);

  useFrame(({ clock }) => {
    if (!keyRef.current) return;
    keyRef.current.intensity = (1 + Math.sin(clock.elapsedTime * 0.7) * 0.22) * glowIntensity;
  });

  return (
    <>
      <directionalLight ref={keyRef} position={[4, 9, 2]} color="#8ecfff" intensity={1.1 * glowIntensity} />
      <directionalLight position={[-5, 6, -20]} color="#8d70ff" intensity={0.9 * glowIntensity} />
      <pointLight position={[0, 2.4, -102]} color="#5d7dff" intensity={1.7 * glowIntensity} distance={30} />
    </>
  );
}

export function World({ progress, quality, onSelectZone, onReady }: WorldProps) {
  return (
    <Canvas
      className="world-canvas"
      camera={{ position: [0, 1.8, 8], fov: 50, near: 0.1, far: 420 }}
      dpr={[1, quality.dpr]}
      gl={{ antialias: quality.antialias, powerPreference: 'high-performance' }}
      onCreated={onReady}
    >
      <color attach="background" args={['#03040b']} />
      <fog attach="fog" args={['#040511', 8, 255]} />
      <ambientLight intensity={0.16} />
      <PulseLights glowIntensity={quality.glowIntensity} />

      <Suspense fallback={null}>
        <Environment preset="night" />
        <EnvironmentArchitecture detailedGrid={quality.enableGridDetail} glowBoost={quality.glowIntensity} />
        <MediaPlanes quality={quality} />
        <Particles count={quality.particleCount} spread={85} />
        <Hotspots onSelect={onSelectZone} />
      </Suspense>

      <CameraRig progress={progress} />
    </Canvas>
  );
}
