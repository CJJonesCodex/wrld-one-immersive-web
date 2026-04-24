import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { FeaturedWorld, QualityLevel } from '../types/world';

interface WorldOrbsProps {
  activeWorld: FeaturedWorld;
  quality: QualityLevel;
}

export function WorldOrbs({ activeWorld, quality }: WorldOrbsProps) {
  const count = quality === 'low' ? 5 : quality === 'medium' ? 9 : 14;
  const group = useRef<THREE.Group>(null);
  const orbs = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      p: [Math.sin(i * 1.7) * 3.2, -0.8 + (i % 6) * 0.55, -1.5 - i * 0.9] as [number, number, number],
      r: 0.06 + (i % 5) * 0.04,
      phase: i * 0.7,
    })), [count]);

  useFrame((state) => {
    group.current?.children.forEach((child, i) => {
      child.position.y = orbs[i].p[1] + Math.sin(state.clock.elapsedTime * 0.35 + orbs[i].phase) * 0.08;
    });
  });

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.p}>
          <sphereGeometry args={[orb.r, 16, 16]} />
          <meshBasicMaterial transparent opacity={0.2} color={activeWorld.colors.accent} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}
