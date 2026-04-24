import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import { Color, Group, MathUtils, Texture } from 'three';
import type { FeaturedWorld } from '../data/featuredWorlds';
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
  const [hovered, setHovered] = useState(false);
  const mediaHeight = 2.8;
  const mediaWidth = useMemo(() => mediaHeight * world.aspectRatio, [world.aspectRatio]);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const targetScale = isActive ? 1.07 : hovered ? 1.02 : 0.93;
    groupRef.current.scale.x = MathUtils.damp(groupRef.current.scale.x, targetScale, 4.8, delta);
    groupRef.current.scale.y = MathUtils.damp(groupRef.current.scale.y, targetScale, 4.8, delta);
    groupRef.current.scale.z = MathUtils.damp(groupRef.current.scale.z, 1, 4.8, delta);
    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      world.worldPosition[1] + Math.sin(t * 0.45 + world.depthLayer) * 0.08,
      2.5,
      delta,
    );
    groupRef.current.rotation.z = MathUtils.damp(groupRef.current.rotation.z, hovered ? 0.012 : 0, 4.8, delta);
  });

  return (
    <group
      ref={groupRef}
      position={[world.worldPosition[0], world.worldPosition[1], world.worldPosition[2] + zOffset]}
      rotation={world.rotation}
      onClick={onSelect}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[mediaWidth + 0.24, mediaHeight + 0.26, 0.1]} />
        <meshPhysicalMaterial color="#fff8f2" transmission={0.22} roughness={0.38} metalness={0.05} transparent opacity={0.42} />
      </mesh>

      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[mediaWidth, mediaHeight]} />
        {media ? (
          <meshStandardMaterial map={media} emissive={new Color(world.colorAccent)} emissiveIntensity={isActive ? 0.18 : 0.06} />
        ) : (
          <meshStandardMaterial color={new Color(world.gradientA)} emissive={new Color(world.gradientB)} emissiveIntensity={isActive ? 0.28 : 0.14} />
        )}
      </mesh>

      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[mediaWidth, mediaHeight]} />
        <meshBasicMaterial transparent opacity={0.09} color="#ffffff" />
      </mesh>

      <mesh position={[0, -mediaHeight * 0.5 - 0.18, 0.08]}>
        <planeGeometry args={[mediaWidth, 0.28]} />
        <meshBasicMaterial color="#fdf8ef" transparent opacity={0.38} />
      </mesh>

      <SpatialLightSweep active={isActive || hovered} width={mediaWidth} />

      <Html transform position={[-mediaWidth * 0.45, mediaHeight * 0.56, 0.11]} distanceFactor={10}>
        <span className="world-label-chip" data-cursor="interactive">
          {world.indexLabel}
        </span>
      </Html>

      <Html transform position={[-mediaWidth * 0.45, -mediaHeight * 0.61, 0.11]} distanceFactor={10}>
        <button type="button" className="world-title-tag" onClick={onSelect} data-cursor="interactive" aria-label={`Open ${world.title} details`}>
          {world.indexLabel} / {world.title.toUpperCase()}
        </button>
      </Html>

      <Html transform position={[mediaWidth * 0.4, -mediaHeight * 0.61, 0.11]} distanceFactor={10}>
        <button type="button" className="world-view-tag" onClick={onSelect} data-cursor="interactive" aria-label={`View ${world.title}`}>
          View
        </button>
      </Html>
    </group>
  );
}
