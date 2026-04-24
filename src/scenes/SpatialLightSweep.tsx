import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

export function SpatialLightSweep({ active = false, width = 2.2 }: { active?: boolean; width?: number }) {
  const sweepRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!sweepRef.current) return;
    const t = clock.elapsedTime;
    sweepRef.current.position.x = Math.sin(t * 0.32) * (width * 0.42);
    const mat = sweepRef.current.material;
    if (!Array.isArray(mat)) {
      mat.opacity = active ? 0.12 + Math.sin(t * 0.8) * 0.04 : 0.025;
    }
  });

  return (
    <mesh ref={sweepRef} position={[0, 0, 0.05]}>
      <planeGeometry args={[width * 0.35, 0.2]} />
      <meshBasicMaterial color="#fff8dc" transparent opacity={0.08} depthWrite={false} />
    </mesh>
  );
}
