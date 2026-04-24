import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { FeaturedWorld, QualityLevel } from '../types/world';

interface DepthMistProps {
  quality: QualityLevel;
  activeWorld: FeaturedWorld;
}

export function DepthMist({ quality, activeWorld }: DepthMistProps) {
  const count = quality === 'low' ? 70 : quality === 'medium' ? 150 : 260;
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = -4 + ((i * 17) % 80) / 10;
      arr[i * 3 + 1] = -1.2 + ((i * 23) % 40) / 10;
      arr[i * 3 + 2] = -16 + ((i * 29) % 170) / 10;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const attribute = ref.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < count; i += 1) {
      const z = attribute.getZ(i) + delta * 0.22;
      attribute.setZ(i, z > 1 ? -16 : z);
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color={activeWorld.colors.primary} transparent opacity={0.14} depthWrite={false} />
    </points>
  );
}
