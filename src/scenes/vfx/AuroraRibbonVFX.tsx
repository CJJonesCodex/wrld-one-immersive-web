import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { getWorldVfxPreset } from '../../data/worldVfxPresets';
import type { QualityLevel } from '../../types/world';

interface AuroraRibbonVFXProps {
  quality: QualityLevel;
  activeStrength: number;
  reducedMotion: boolean;
}

export function AuroraRibbonVFX({ quality, activeStrength, reducedMotion }: AuroraRibbonVFXProps) {
  const groupRef = useRef<THREE.Group>(null);
  const preset = getWorldVfxPreset('aurora-passage');
  const ribbonCount = quality === 'high' ? 5 : 4;

  const ribbons = useMemo(
    () =>
      Array.from({ length: ribbonCount }, (_, i) => {
        const points = [
          new THREE.Vector3(-3.8, -0.8 + i * 0.45, -8.8 + i * 0.1),
          new THREE.Vector3(-1, -0.2 + i * 0.35, -8.4),
          new THREE.Vector3(1.4, 0.4 + i * 0.2, -8.1),
          new THREE.Vector3(3.9, 1.1 + i * 0.18, -8.3),
        ];
        const curve = new THREE.CatmullRomCurve3(points);
        return new THREE.TubeGeometry(curve, 54, 0.028 + i * 0.008, 8, false);
      }),
    [ribbonCount],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current?.children.forEach((child, i) => {
      const amp = reducedMotion ? 0.018 : 0.08;
      child.position.y = Math.sin(t * (0.14 + i * 0.03) + i) * amp;
      child.position.x = Math.cos(t * (0.1 + i * 0.025)) * (reducedMotion ? 0.006 : 0.035);
    });
  });

  return (
    <group ref={groupRef}>
      {ribbons.map((geometry, i) => (
        <mesh key={i} geometry={geometry}>
          <meshBasicMaterial
            transparent
            opacity={0.12 + activeStrength * 0.2}
            depthWrite={false}
            color={i % 2 === 0 ? preset.secondary : preset.accent}
          />
        </mesh>
      ))}
    </group>
  );
}
