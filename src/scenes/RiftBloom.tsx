import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { FeaturedWorld, QualityLevel } from '../types/world';
import { clamp01 } from '../utils/math';

interface RiftBloomProps {
  progress: number;
  activeWorld: FeaturedWorld;
  quality: QualityLevel;
}

export function RiftBloom({ progress, activeWorld, quality }: RiftBloomProps) {
  const group = useRef<THREE.Group>(null);
  const petals = quality === 'high' ? 12 : 8;
  const opacity = clamp01((progress - 0.78) / 0.16) * 0.7;
  const arr = useMemo(() => Array.from({ length: petals }, (_, i) => i), [petals]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = state.clock.elapsedTime * 0.025;
  });

  return (
    <group ref={group} position={[0, 0.55, -15.5]}>
      {arr.map((i) => (
        <mesh key={i} rotation={[0, 0, (i / petals) * Math.PI * 2]}>
          <planeGeometry args={[0.18, 0.78]} />
          <meshBasicMaterial color={activeWorld.colors.secondary} transparent opacity={opacity} depthWrite={false} />
        </mesh>
      ))}
      <mesh>
        <circleGeometry args={[0.22, 32]} />
        <meshBasicMaterial color="#fffdf7" transparent opacity={opacity} />
      </mesh>
    </group>
  );
}
