import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

export function DepthMist() {
  const group = useRef<Group>(null);
  const planes = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, index) => ({
        position: [((index % 3) - 1) * 4.4, 1.8 + index * 0.4, -22 - index * 23] as [number, number, number],
        scale: 13 + index * 3,
        tint: ['#fff6e9', '#fce0ff', '#d8eeff'][index % 3],
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.07) * 0.35;
  });

  return (
    <group ref={group}>
      {planes.map((plane) => (
        <mesh key={plane.position[2]} position={plane.position}>
          <planeGeometry args={[plane.scale, plane.scale * 0.52]} />
          <meshBasicMaterial color={plane.tint} transparent opacity={0.05} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}
