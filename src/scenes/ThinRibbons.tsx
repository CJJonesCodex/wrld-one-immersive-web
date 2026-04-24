import { useMemo } from 'react';
import * as THREE from 'three';
import type { FeaturedWorld, QualityLevel } from '../types/world';

interface ThinRibbonsProps {
  activeWorld: FeaturedWorld;
  quality: QualityLevel;
}

export function ThinRibbons({ activeWorld, quality }: ThinRibbonsProps) {
  const count = quality === 'low' ? 3 : quality === 'medium' ? 4 : 5;
  const curves = useMemo(
    () =>
      Array.from({ length: count }, (_, i) =>
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(-2.8 + i, 1 + i * 0.15, -1 - i),
          new THREE.Vector3(1.4 - i * 0.3, 0.4 + i * 0.2, -6),
          new THREE.Vector3(-1.8 + i * 0.4, 1.7 - i * 0.1, -13),
        ]),
      ),
    [count],
  );
  return (
    <group>
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 80, 0.008 + i * 0.001, 6, false]} />
          <meshBasicMaterial color={activeWorld.colors.secondary} transparent opacity={0.18} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}
