import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, Group } from 'three';
import type { QualityLevel } from '../../types/world';

interface LivingMacroWorldProps {
  opacity: number;
  objectCount: number;
  quality: QualityLevel;
  isMobileFit: boolean;
  reducedMotion: boolean;
}

export function LivingMacroWorld({ opacity, objectCount, isMobileFit, reducedMotion }: LivingMacroWorldProps) {
  const group = useRef<Group>(null);
  const dewCount = Math.max(12, Math.floor(objectCount));

  const dew = useMemo(
    () =>
      Array.from({ length: dewCount }, (_, i) => ({
        x: Math.sin(i * 1.8) * (isMobileFit ? 1.7 : 2.2),
        y: -0.2 + (i % 9) * 0.17,
        z: -6 - (i % 7) * 0.42,
        s: 0.03 + (i % 5) * 0.012,
      })),
    [dewCount, isMobileFit],
  );

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.2) * 0.03;
  });

  return (
    <group ref={group} position={[0, isMobileFit ? -0.25 : -0.1, 0]}>
      <mesh position={[0, -0.6, -8]} rotation={[-0.8, 0, 0]}>
        <circleGeometry args={[isMobileFit ? 2.5 : 3.3, 48]} />
        <meshBasicMaterial color="#cde9c6" transparent opacity={0.18 * opacity} />
      </mesh>
      {[0, 1, 2, 3].map((stem) => (
        <mesh key={stem} position={[-1.4 + stem * 0.9, 0.1 + stem * 0.12, -7.2 - stem * 0.22]} rotation={[0, 0, -0.2 + stem * 0.08]}>
          <cylinderGeometry args={[0.01, 0.016, 1.8 + stem * 0.2, 8]} />
          <meshBasicMaterial color="#67b57e" transparent opacity={0.35 * opacity} />
        </mesh>
      ))}
      {dew.map((drop, i) => (
        <mesh key={i} position={[drop.x, drop.y, drop.z]}>
          <sphereGeometry args={[drop.s, 10, 10]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#ffd166' : i % 2 === 0 ? '#7cffb2' : '#fffdf7'} transparent opacity={0.48 * opacity} blending={AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}
