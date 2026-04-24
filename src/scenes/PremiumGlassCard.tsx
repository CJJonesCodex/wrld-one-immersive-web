import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils, Texture } from 'three';
import { FeaturedWorld } from '../data/featuredWorlds';
import { SpatialLightSweep } from './SpatialLightSweep';

interface PremiumGlassCardProps {
  world: FeaturedWorld;
  isActive: boolean;
  media: Texture | null;
  onSelect: () => void;
  zOffset?: number;
}

export function PremiumGlassCard({ world, isActive, media, onSelect, zOffset = 0 }: PremiumGlassCardProps) {
  const groupRef = useRef<Group>(null);
  const mediaHeight = useMemo(() => 2.8, []);
  const mediaWidth = useMemo(() => mediaHeight * world.aspectRatio, [mediaHeight, world.aspectRatio]);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const targetScale = isActive ? 1.08 : 0.92;
    groupRef.current.scale.x = MathUtils.damp(groupRef.current.scale.x, targetScale, 5.5, delta);
    groupRef.current.scale.y = MathUtils.damp(groupRef.current.scale.y, targetScale, 5.5, delta);
    groupRef.current.scale.z = MathUtils.damp(groupRef.current.scale.z, 1, 5.5, delta);
    groupRef.current.position.y = world.worldPosition[1] + Math.sin(t * 0.5 + world.depthLayer) * 0.08;
  });

  return (
    <group
      ref={groupRef}
      position={[world.worldPosition[0], world.worldPosition[1], world.worldPosition[2] + zOffset]}
      rotation={world.rotation}
      onClick={onSelect}
    >
      <mesh>
        <boxGeometry args={[mediaWidth + 0.22, mediaHeight + 0.22, 0.1]} />
        <meshPhysicalMaterial color="#0b0d12" transmission={0.14} roughness={0.4} metalness={0.3} transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[mediaWidth, mediaHeight]} />
        {media ? (
          <meshStandardMaterial map={media} emissive={world.colorAccent} emissiveIntensity={isActive ? 0.18 : 0.04} />
        ) : (
          <meshStandardMaterial color="#11151b" emissive="#1d2a39" emissiveIntensity={isActive ? 0.45 : 0.18} />
        )}
      </mesh>
      <mesh position={[0, -mediaHeight * 0.5 - 0.22, 0.08]}>
        <planeGeometry args={[mediaWidth, 0.34]} />
        <meshBasicMaterial color="#090b10" transparent opacity={0.8} />
      </mesh>
      <SpatialLightSweep active={isActive} />
    </group>
  );
}
