import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import type { QualityLevel } from '../../types/world';

interface CoreChamberWorldProps {
  opacity: number;
  objectCount: number;
  quality: QualityLevel;
  isMobileFit: boolean;
  reducedMotion: boolean;
}

export function CoreChamberWorld({ opacity, objectCount, isMobileFit, reducedMotion }: CoreChamberWorldProps) {
  const rings = Math.max(4, Math.floor(objectCount * 0.3));
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y = clock.elapsedTime * 0.12;
  });

  return (
    <group ref={group} position={[0, 0.2, -7.2]} scale={isMobileFit ? 0.82 : 1}>
      <mesh>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.58 * opacity} />
      </mesh>
      {Array.from({ length: rings }).map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.13, i * 0.22, 0]}>
          <torusGeometry args={[0.7 + i * 0.11, 0.01, 6, 64]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#ffd166' : '#c5b7ff'} transparent opacity={0.35 * opacity} />
        </mesh>
      ))}
    </group>
  );
}
