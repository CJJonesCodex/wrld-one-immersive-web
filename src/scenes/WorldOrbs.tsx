import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';

export function WorldOrbs() {
  const groupRef = useRef<Group>(null);
  const orbs = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, index) => ({
        key: `orb-${index}`,
        radius: 0.12 + (index % 4) * 0.07,
        pos: [
          (Math.random() - 0.5) * 8,
          1.5 + Math.random() * 3.2,
          -8 - index * 24 - Math.random() * 18,
        ] as [number, number, number],
        color: ['#ffd2bc', '#b2deff', '#d8c2ff', '#c6f2d9'][index % 4],
      })),
    [],
  );

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = MathUtils.damp(groupRef.current.rotation.y, Math.sin(clock.elapsedTime * 0.1) * 0.08, 2, delta);
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, index) => (
        <mesh key={orb.key} position={orb.pos}>
          <sphereGeometry args={[orb.radius, 24, 24]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={0.18 + (index % 3) * 0.05}
            transparent
            opacity={0.65}
            roughness={0.3}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}
