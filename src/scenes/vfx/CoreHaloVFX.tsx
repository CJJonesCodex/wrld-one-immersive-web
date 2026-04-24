import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { getWorldVfxPreset } from '../../data/worldVfxPresets';
import type { QualityLevel } from '../../types/world';

interface CoreHaloVFXProps {
  quality: QualityLevel;
  activeStrength: number;
  reducedMotion: boolean;
}

export function CoreHaloVFX({ quality, activeStrength, reducedMotion }: CoreHaloVFXProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const preset = getWorldVfxPreset('core-chamber');
  const ringCount = quality === 'high' ? 12 : quality === 'medium' ? 8 : 5;
  const rings = useMemo(() => Array.from({ length: ringCount }, (_, i) => ({ radius: 0.8 + i * 0.22, speed: 0.02 + i * 0.006 })), [ringCount]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current?.children.forEach((child, i) => {
      const ring = rings[i];
      if (!ring) return;
      child.rotation.z = t * ring.speed * (i % 2 === 0 ? 1 : -1) * (reducedMotion ? 0.35 : 1);
    });

    if (coreRef.current) {
      const pulse = 0.96 + ((Math.sin(t * 1.1) + 1) * 0.04 * (reducedMotion ? 0.4 : 1));
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[0, 0.6, -7]}>
      <group ref={groupRef}>
        {rings.map((ring, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[ring.radius, 0.01, 12, 72]} />
            <meshBasicMaterial transparent opacity={0.1 + activeStrength * 0.24} depthWrite={false} color={i % 3 === 0 ? preset.accent : preset.secondary} />
          </mesh>
        ))}
      </group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.18, 18, 18]} />
        <meshBasicMaterial transparent opacity={0.24 + activeStrength * 0.22} depthWrite={false} color={preset.secondary} />
      </mesh>
    </group>
  );
}
