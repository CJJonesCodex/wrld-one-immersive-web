import { useMemo } from 'react';
import type { QualityLevel } from '../../types/world';

interface AuroraPassageWorldProps {
  opacity: number;
  objectCount: number;
  quality: QualityLevel;
  isMobileFit: boolean;
  reducedMotion: boolean;
}

export function AuroraPassageWorld({ opacity, objectCount, isMobileFit }: AuroraPassageWorldProps) {
  const ribbons = Math.max(3, Math.min(5, Math.floor(objectCount * 0.2)));
  const rows = useMemo(
    () => Array.from({ length: ribbons }, (_, i) => ({ y: -0.4 + i * 0.36, z: -6.4 - i * 0.7, w: 2.6 + i * 0.65 })),
    [ribbons],
  );

  return (
    <group scale={isMobileFit ? 0.8 : 1}>
      {rows.map((r, i) => (
        <mesh key={i} position={[0, r.y, r.z]} rotation={[0, 0, i % 2 === 0 ? -0.14 : 0.11]}>
          <planeGeometry args={[r.w, 0.16 + i * 0.03]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#ff7a66' : i % 2 === 0 ? '#a78bfa' : '#ffb4c8'} transparent opacity={0.34 * opacity} />
        </mesh>
      ))}
      <mesh position={[0, 0.1, -9]}>
        <planeGeometry args={[6, 3]} />
        <meshBasicMaterial color="#d08cff" transparent opacity={0.07 * opacity} />
      </mesh>
    </group>
  );
}
