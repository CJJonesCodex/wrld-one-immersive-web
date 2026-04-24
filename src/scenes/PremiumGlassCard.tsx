import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { FeaturedWorld, QualityLevel, WorldId } from '../types/world';
import type { HapticsState } from '../systems/useHaptics';
import { useMediaTexture } from './useMediaTexture';

interface PremiumGlassCardProps {
  world: FeaturedWorld;
  activeStrength: number;
  active: boolean;
  nearActive: boolean;
  quality: QualityLevel;
  allowVideo: boolean;
  onSelect: (worldId: WorldId) => void;
  haptics: HapticsState;
}

function getCardSize(aspectRatio: number): { width: number; height: number } {
  if (Math.abs(aspectRatio - 9 / 16) < 0.02) return { width: 1.53, height: 2.72 };
  if (Math.abs(aspectRatio - 4 / 5) < 0.02) return { width: 1.98, height: 2.48 };
  if (Math.abs(aspectRatio - 16 / 10) < 0.04) return { width: 3.1, height: 1.94 };
  if (Math.abs(aspectRatio - 1) < 0.02) return { width: 2.34, height: 2.34 };
  if (Math.abs(aspectRatio - 16 / 9) < 0.02) return { width: 3.18, height: 1.79 };
  const width = 2.6;
  return { width, height: width / aspectRatio };
}

export function PremiumGlassCard({ world, activeStrength, active, nearActive, quality, allowVideo, onSelect, haptics }: PremiumGlassCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { texture } = useMediaTexture({ media: world.media, allowVideo, active, quality });
  const { width, height } = useMemo(() => getCardSize(world.media.aspectRatio), [world.media.aspectRatio]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const target = active ? 1.065 : nearActive ? 0.96 : 0.84;
    const s = THREE.MathUtils.damp(groupRef.current.scale.x, target, 6, delta);
    groupRef.current.scale.setScalar(s);
    groupRef.current.position.y = world.scene.position[1] + Math.sin(t * 0.5 + world.index) * 0.025;
  });

  return (
    <group ref={groupRef} position={world.scene.position} rotation={world.scene.rotation}>
      <mesh position={[0, 0, -0.018]}>
        <planeGeometry args={[width + 0.2, height + 0.2]} />
        <meshBasicMaterial transparent depthWrite={false} color={world.colors.glassTint} opacity={active ? 0.28 : nearActive ? 0.18 : 0.1} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial transparent opacity={active ? 1 : nearActive ? 0.82 : 0.48} map={texture ?? undefined} color={texture ? '#ffffff' : world.colors.primary} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[width + 0.01, height + 0.01]} />
        <meshBasicMaterial wireframe transparent opacity={active ? 0.42 : 0.14} color={world.colors.secondary} />
      </mesh>
      <Html position={[-width / 2 + 0.08, height / 2 + 0.03, 0.03]} transform distanceFactor={8}>
        <span className="hotspot-label">{world.indexLabel} / {world.title.toUpperCase()}</span>
      </Html>
      <Html position={[width / 2 - 0.08, -height / 2 - 0.03, 0.03]} transform distanceFactor={8}>
        <button className="hotspot-label tap-target" onClick={() => { haptics.pulse(12); onSelect(world.id); }}>View</button>
      </Html>
      <mesh onClick={() => { haptics.pulse(12); onSelect(world.id); }}>
        <planeGeometry args={[width + 0.34, height + 0.34]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {active && (
        <mesh position={[Math.sin(activeStrength * Math.PI) * 0.2, 0, 0.024]} rotation={[0, 0, -0.3]}>
          <planeGeometry args={[0.12, height * 1.5]} />
          <meshBasicMaterial color={world.colors.secondary} transparent opacity={0.18} />
        </mesh>
      )}
    </group>
  );
}
