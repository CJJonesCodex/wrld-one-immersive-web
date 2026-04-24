import { useMemo, useRef } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface ParticlesProps {
  count: number;
  spread?: number;
}

export function Particles({ count, spread = 90 }: ParticlesProps) {
  const groupRef = useRef<Group>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.2) * 26;
      arr[i * 3 + 2] = -Math.random() * 230;
    }
    return arr;
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.12) * 0.45;
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial size={0.05} color="#b8c7d9" transparent opacity={0.45} depthWrite={false} />
      </Points>
      <Points positions={positions} stride={3} frustumCulled position={[0, 0, -22]}>
        <PointMaterial size={0.02} color="#79889a" transparent opacity={0.3} depthWrite={false} />
      </Points>
    </group>
  );
}
