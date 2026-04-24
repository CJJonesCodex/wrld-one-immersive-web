import { useMemo } from 'react';
import { Points, PointMaterial } from '@react-three/drei';

interface ParticlesProps {
  count: number;
  spread?: number;
}

export function Particles({ count, spread = 70 }: ParticlesProps) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.1) * 25;
      arr[i * 3 + 2] = -Math.random() * 230;
    }
    return arr;
  }, [count, spread]);

  return (
    <Points positions={positions} stride={3} frustumCulled>
      <PointMaterial size={0.08} color="#6fd3ff" transparent opacity={0.9} depthWrite={false} />
    </Points>
  );
}
