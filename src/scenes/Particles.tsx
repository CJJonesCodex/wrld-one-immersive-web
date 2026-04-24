import { useMemo, useRef } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

interface ParticlesProps {
  count: number;
  spread?: number;
}

export function Particles({ count, spread = 92 }: ParticlesProps) {
  const groupRef = useRef<Group>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.16) * 24;
      arr[i * 3 + 2] = -Math.random() * 240;
    }
    return arr;
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.11) * 0.42;
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial size={0.055} color="#ffeecf" transparent opacity={0.55} depthWrite={false} />
      </Points>
      <Points positions={positions} stride={3} frustumCulled position={[0, 0, -24]}>
        <PointMaterial size={0.025} color="#bde2ff" transparent opacity={0.36} depthWrite={false} />
      </Points>
    </group>
  );
}
