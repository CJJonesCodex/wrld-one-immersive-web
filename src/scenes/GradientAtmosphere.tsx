import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import type { FeaturedWorld, QualityLevel } from '../types/world';

interface GradientAtmosphereProps {
  activeWorld: FeaturedWorld;
  progress: number;
  quality: QualityLevel;
}

export function GradientAtmosphere({ activeWorld }: GradientAtmosphereProps) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(() => {
    if (!matRef.current) return;
    matRef.current.color.lerp(new THREE.Color(activeWorld.colors.atmosphereA), 0.05);
  });
  return (
    <mesh>
      <sphereGeometry args={[36, 24, 24]} />
      <meshBasicMaterial ref={matRef} side={THREE.BackSide} transparent opacity={0.34} color={activeWorld.colors.atmosphereB} depthWrite={false} />
    </mesh>
  );
}
