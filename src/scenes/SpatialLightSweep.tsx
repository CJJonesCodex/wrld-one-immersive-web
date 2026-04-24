import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export function SpatialLightSweep({ active = false }: { active?: boolean }) {
  const sweepRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!sweepRef.current) return;
    const t = clock.elapsedTime;
    sweepRef.current.position.x = Math.sin(t * 0.35) * 1.2;
    const mat = sweepRef.current.material;
    if (!Array.isArray(mat)) {
      mat.opacity = active ? 0.11 + Math.sin(t * 0.9) * 0.03 : 0.03;
    }
  });

  return (
    <mesh ref={sweepRef} position={[0, 0, 0.01]}>
      <planeGeometry args={[2.2, 0.18]} />
      <meshBasicMaterial color="#dbe7f3" transparent opacity={0.05} depthWrite={false} />
    </mesh>
  );
}
