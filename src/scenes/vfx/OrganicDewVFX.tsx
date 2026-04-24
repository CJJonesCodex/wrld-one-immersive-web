import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { getWorldVfxPreset } from '../../data/worldVfxPresets';
import type { QualityLevel } from '../../types/world';

interface OrganicDewVFXProps {
  quality: QualityLevel;
  activeStrength: number;
  reducedMotion: boolean;
}

export function OrganicDewVFX({ quality, activeStrength, reducedMotion }: OrganicDewVFXProps) {
  const groupRef = useRef<THREE.Group>(null);
  const dropletCount = quality === 'high' ? 84 : quality === 'medium' ? 48 : 24;
  const preset = getWorldVfxPreset('living-macro');
  const droplets = useMemo(
    () =>
      Array.from({ length: dropletCount }, (_, i) => ({
        position: new THREE.Vector3(-3.5 + ((i * 1.13) % 7), -1 + ((i * 0.71) % 3.6), -3 - ((i * 0.43) % 7)),
        radius: 0.018 + ((i * 0.017) % 0.067),
        speed: 0.15 + ((i * 0.023) % 0.2),
      })),
    [dropletCount],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, index) => {
      const droplet = droplets[index];
      if (!droplet) return;
      const t = state.clock.elapsedTime * droplet.speed;
      child.position.y = droplet.position.y + Math.sin(t + index) * (reducedMotion ? 0.008 : 0.05);
      child.position.x = droplet.position.x + Math.cos(t * 0.7 + index) * (reducedMotion ? 0.004 : 0.03);
    });
  });

  const opacity = 0.15 + activeStrength * 0.3;

  return (
    <group ref={groupRef}>
      {droplets.map((droplet, index) => (
        <mesh key={index} position={droplet.position}>
          <sphereGeometry args={[droplet.radius, 10, 10]} />
          <meshBasicMaterial
            transparent
            depthWrite={false}
            opacity={opacity}
            color={index % 3 === 0 ? preset.secondary : index % 2 === 0 ? preset.accent : '#fffdf7'}
          />
        </mesh>
      ))}
      {[0, 1, 2].map((ring) => (
        <mesh key={`ring-${ring}`} position={[0, 0.7 + ring * 0.15, -7 - ring * 0.4]} rotation={[Math.PI / 2, 0, ring * 0.2]}>
          <torusGeometry args={[1.6 + ring * 0.45, 0.012, 16, 72]} />
          <meshBasicMaterial transparent depthWrite={false} color={preset.secondary} opacity={0.08 + activeStrength * 0.1} />
        </mesh>
      ))}
    </group>
  );
}
