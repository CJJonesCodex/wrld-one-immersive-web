import { useMemo, useRef } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface ParticlesProps {
  count: number;
  spread?: number;
}

export function Particles({ count, spread = 70 }: ParticlesProps) {
  const groupRef = useRef<Group>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.1) * 32;
      arr[i * 3 + 2] = -Math.random() * 260;
    }
    return arr;
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.15) * 0.6;
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial size={0.08} color="#70d2ff" transparent opacity={0.85} depthWrite={false} />
      </Points>
      <Points positions={positions} stride={3} frustumCulled position={[0, 0, -25]}>
        <PointMaterial size={0.03} color="#9d88ff" transparent opacity={0.45} depthWrite={false} />
      </Points>
    </group>
  );
}
