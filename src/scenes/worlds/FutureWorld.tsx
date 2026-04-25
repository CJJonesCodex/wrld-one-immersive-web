import { useMemo } from 'react';
import { AdditiveBlending } from 'three';
import type { QualityLevel } from '../../types/world';

interface FutureWorldProps {
  opacity: number;
  objectCount: number;
  quality: QualityLevel;
  isMobileFit: boolean;
  reducedMotion: boolean;
}

export function FutureWorld({ opacity, objectCount, isMobileFit }: FutureWorldProps) {
  const dots = Math.max(24, objectCount);
  const points = useMemo(
    () =>
      Array.from({ length: dots }, (_, i) => ({
        x: Math.sin(i * 1.2) * (isMobileFit ? 1.9 : 2.5),
        y: Math.cos(i * 0.8) * 1.25,
        z: -6.4 - (i % 9) * 0.42,
      })),
    [dots, isMobileFit],
  );

  return (
    <group>
      {points.map((point, i) => (
        <mesh key={i} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#7cffb2' : '#fffdf7'} transparent opacity={0.55 * opacity} blending={AdditiveBlending} />
        </mesh>
      ))}
      {Array.from({ length: 8 }).map((_, l) => (
        <mesh key={l} position={[0, -0.65 + l * 0.21, -7.9 - l * 0.18]}>
          <planeGeometry args={[4.2 - l * 0.28, 0.01]} />
          <meshBasicMaterial color="#95ffd1" transparent opacity={0.24 * opacity} />
        </mesh>
      ))}
    </group>
  );
}
