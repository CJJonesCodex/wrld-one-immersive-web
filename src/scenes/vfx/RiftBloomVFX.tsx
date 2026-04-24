import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { getWorldVfxPreset } from '../../data/worldVfxPresets';
import type { QualityLevel } from '../../types/world';

interface RiftBloomVFXProps {
  quality: QualityLevel;
  activeStrength: number;
  progress: number;
  reducedMotion: boolean;
}

export function RiftBloomVFX({ quality, activeStrength, progress, reducedMotion }: RiftBloomVFXProps) {
  const groupRef = useRef<THREE.Group>(null);
  const preset = getWorldVfxPreset('rift-bloom');
  const petals = quality === 'high' ? 12 : 8;
  const petalData = useMemo(() => Array.from({ length: petals }, (_, i) => ({ angle: (Math.PI * 2 * i) / petals })), [petals]);

  useFrame((state) => {
    const open = THREE.MathUtils.clamp((progress - 0.78) / 0.2, 0, 1);
    const t = state.clock.elapsedTime;

    groupRef.current?.children.forEach((child, i) => {
      const baseAngle = petalData[i].angle + t * 0.025;
      child.position.x = Math.cos(baseAngle) * (0.62 + open * 0.75);
      child.position.y = Math.sin(baseAngle) * (0.34 + open * 0.42) + 0.5;
      child.rotation.z = baseAngle;
      const scale = 0.88 + open * 0.36 + (reducedMotion ? 0 : Math.sin(t * 0.9 + i) * 0.04);
      child.scale.set(scale, scale, 1);
    });
  });

  return (
    <group position={[0, 0, -9.8]}>
      <group ref={groupRef}>
        {petalData.map((_, i) => (
          <mesh key={i}>
            <planeGeometry args={[0.46, 1.12]} />
            <meshBasicMaterial transparent opacity={0.14 + activeStrength * 0.24} depthWrite={false} color={i % 2 === 0 ? preset.secondary : preset.accent} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 0.5, 0.1]}>
        <circleGeometry args={[0.24, 24]} />
        <meshBasicMaterial transparent opacity={progress > 0.82 ? 0.2 + activeStrength * 0.16 : 0.08} depthWrite={false} color={preset.accent} />
      </mesh>
    </group>
  );
}
