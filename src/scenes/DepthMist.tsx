import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export function DepthMist() {
  const group = useRef<Group>(null);
  const planes = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        position: [((i % 2) - 0.5) * 8, 1.2 + i * 0.32, -18 - i * 24] as [number, number, number],
        scale: 12 + i * 3,
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.08) * 0.4;
  });

  return (
    <group ref={group}>
      {planes.map((plane) => (
        <mesh key={plane.position[2]} position={plane.position}>
          <planeGeometry args={[plane.scale, plane.scale * 0.5]} />
          <meshBasicMaterial color="#8ea0b8" transparent opacity={0.038} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}
