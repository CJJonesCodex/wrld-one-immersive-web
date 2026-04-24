import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { FeaturedWorld, QualityLevel, WorldId } from '../types/world';
import type { HapticsState } from '../systems/useHaptics';
import { useMediaTexture } from './useMediaTexture';

interface PremiumGlassCardProps {
  world: FeaturedWorld;
  activeWorldId: WorldId;
  activeStrength: number;
  isActive: boolean;
  isNearActive: boolean;
  showLabels: boolean;
  showViewButton: boolean;
  allowVideo: boolean;
  quality: QualityLevel;
  onSelect: (worldId: WorldId) => void;
  haptics?: HapticsState;
}

function getCardSize(aspectRatio: number): { width: number; height: number } {
  if (Math.abs(aspectRatio - 9 / 16) < 0.02) return { width: 1.53, height: 2.72 };
  if (Math.abs(aspectRatio - 4 / 5) < 0.02) return { width: 1.98, height: 2.48 };
  if (Math.abs(aspectRatio - 16 / 10) < 0.04) return { width: 3.1, height: 1.94 };
  if (Math.abs(aspectRatio - 1) < 0.02) return { width: 2.34, height: 2.34 };
  if (Math.abs(aspectRatio - 16 / 9) < 0.02) return { width: 3.18, height: 1.79 };
  return { width: 2.6, height: 1.6 };
}

export function PremiumGlassCard({ world, activeStrength, isActive, isNearActive, showLabels, showViewButton, allowVideo, quality, onSelect, haptics }: PremiumGlassCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { texture } = useMediaTexture({ media: world.media, allowVideo, isActive, isNearActive, quality });
  const { width, height } = useMemo(() => getCardSize(world.media.aspectRatio), [world.media.aspectRatio]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetScale = isActive ? 1.065 : isNearActive ? 0.88 : 0.72;
    const nextScale = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 6, delta);
    groupRef.current.scale.setScalar(nextScale);
    const idle = Math.sin(state.clock.elapsedTime * 0.45 + world.index) * 0.025;
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, world.scene.position[1] + idle, 6, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, Math.sin(state.clock.elapsedTime * 0.2 + world.index) * 0.006, 4, delta);
  });

  const mediaOpacity = isActive ? 1 : isNearActive ? 0.34 : 0.1;
  const backingOpacity = isActive ? 0.28 : isNearActive ? 0.1 : 0.04;
  const borderOpacity = isActive ? 0.52 : isNearActive ? 0.12 : 0.05;
  const canShowLabel = showLabels && isActive && activeStrength >= 0.62;
  const canShowView = showViewButton && isActive && activeStrength >= 0.72;

  return (
    <group ref={groupRef} position={world.scene.position} rotation={world.scene.rotation}>
      <mesh position={[0, -height * 0.52, -0.02]}>
        <planeGeometry args={[width * 0.94, height * 0.5]} />
        <meshBasicMaterial transparent opacity={isActive ? 0.14 : 0.04} color="#1b1422" depthWrite={false} />
      </mesh>

      <mesh position={[0, 0, -0.018]}>
        <planeGeometry args={[width + 0.2, height + 0.2]} />
        <meshBasicMaterial transparent depthWrite={false} color={world.colors.glassTint} opacity={backingOpacity} />
      </mesh>

      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial transparent opacity={mediaOpacity} map={texture ?? undefined} color={texture ? '#ffffff' : world.colors.primary} />
      </mesh>

      <mesh position={[0, height / 2 + 0.01, 0.015]}><planeGeometry args={[width, 0.014]} /><meshBasicMaterial transparent opacity={borderOpacity} color={world.colors.secondary} /></mesh>
      <mesh position={[0, -height / 2 - 0.01, 0.015]}><planeGeometry args={[width, 0.014]} /><meshBasicMaterial transparent opacity={borderOpacity} color={world.colors.secondary} /></mesh>
      <mesh position={[-width / 2 - 0.01, 0, 0.015]}><planeGeometry args={[0.014, height]} /><meshBasicMaterial transparent opacity={borderOpacity} color={world.colors.secondary} /></mesh>
      <mesh position={[width / 2 + 0.01, 0, 0.015]}><planeGeometry args={[0.014, height]} /><meshBasicMaterial transparent opacity={borderOpacity} color={world.colors.secondary} /></mesh>

      {isActive && (
        <mesh position={[-width * 0.22, height * 0.36, 0.024]} rotation={[0, 0, -0.24]}>
          <planeGeometry args={[0.12, height * 0.78]} />
          <meshBasicMaterial color={world.colors.secondary} transparent opacity={0.18} depthWrite={false} />
        </mesh>
      )}

      {canShowLabel && (
        <Html position={[-width / 2 + 0.08, height / 2 + 0.05, 0.04]} transform distanceFactor={8} zIndexRange={[8, 4]}>
          <span className="world-card-label">{world.indexLabel} / {world.title.toUpperCase()}</span>
        </Html>
      )}

      {canShowView && (
        <Html position={[width / 2 - 0.1, -height / 2 - 0.05, 0.04]} transform distanceFactor={8} zIndexRange={[8, 4]}>
          <button className="world-card-view tap-target" onClick={() => { haptics?.pulse(12); onSelect(world.id); }}>View</button>
        </Html>
      )}

      <mesh onClick={() => { haptics?.pulse(12); onSelect(world.id); }}>
        <planeGeometry args={[width + 0.34, height + 0.34]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}
