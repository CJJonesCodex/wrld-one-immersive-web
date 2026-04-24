import { useMemo } from 'react';
import { BackSide, Color } from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

export function GradientAtmosphere() {
  const shellRef = useRef<Mesh>(null);
  const colors = useMemo(() => [new Color('#fff4df'), new Color('#ffd6ea'), new Color('#a7deff')], []);

  useFrame(({ clock }) => {
    if (!shellRef.current) return;
    const t = clock.elapsedTime;
    shellRef.current.rotation.y = t * 0.01;
    const material = shellRef.current.material;
    if (!Array.isArray(material)) {
      material.opacity = 0.26 + Math.sin(t * 0.2) * 0.04;
    }
  });

  return (
    <mesh ref={shellRef} position={[0, 12, -96]}>
      <sphereGeometry args={[180, 32, 32]} />
      <meshBasicMaterial
        side={BackSide}
        transparent
        opacity={0.28}
        color={colors[0]}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
