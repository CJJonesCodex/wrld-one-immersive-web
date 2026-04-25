import { useMemo } from 'react';
import { AdditiveBlending } from 'three';
import type { QualityLevel } from '../../types/world';

interface SignalGardenWorldProps {
  opacity: number;
  objectCount: number;
  quality: QualityLevel;
  isMobileFit: boolean;
  reducedMotion: boolean;
}

export function SignalGardenWorld({ opacity, objectCount, isMobileFit }: SignalGardenWorldProps) {
  const stemCount = Math.max(6, Math.floor(objectCount * 0.4));
  const nodes = useMemo(
    () =>
      Array.from({ length: stemCount }, (_, i) => ({
        x: -2.4 + (i / Math.max(1, stemCount - 1)) * 4.8,
        h: 1 + (i % 4) * 0.35,
        z: -6.2 - (i % 5) * 0.6,
      })),
    [stemCount],
  );

  return (
    <group scale={isMobileFit ? 0.84 : 1}>
      {nodes.map((node, i) => (
        <group key={i} position={[node.x, 0.1, node.z]}>
          <mesh position={[0, node.h / 2, 0]}>
            <cylinderGeometry args={[0.01, 0.01, node.h, 6]} />
            <meshBasicMaterial color="#7be5ff" transparent opacity={0.45 * opacity} />
          </mesh>
          <mesh position={[0, node.h, 0]}>
            <sphereGeometry args={[0.06, 10, 10]} />
            <meshBasicMaterial color="#fffdf7" transparent opacity={0.6 * opacity} blending={AdditiveBlending} />
          </mesh>
        </group>
      ))}
      {[0, 1, 2].map((arc) => (
        <mesh key={arc} position={[0, 0.9 + arc * 0.2, -7.4 - arc * 0.4]} rotation={[0, 0, 0.2 - arc * 0.2]}>
          <torusGeometry args={[1.2 + arc * 0.5, 0.008, 6, 64, 2.5]} />
          <meshBasicMaterial color="#54d8ff" transparent opacity={0.32 * opacity} />
        </mesh>
      ))}
    </group>
  );
}
