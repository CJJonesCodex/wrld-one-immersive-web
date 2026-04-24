import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { getWorldVfxPreset } from '../../data/worldVfxPresets';
import type { QualityLevel } from '../../types/world';

interface FutureConstellationVFXProps {
  quality: QualityLevel;
  activeStrength: number;
  progress: number;
  reducedMotion: boolean;
}

export function FutureConstellationVFX({ quality, activeStrength, progress, reducedMotion }: FutureConstellationVFXProps) {
  const pointsRef = useRef<THREE.Group>(null);
  const preset = getWorldVfxPreset('future-world');
  const dotCount = quality === 'high' ? 80 : quality === 'medium' ? 48 : 24;
  const lineCount = quality === 'high' ? 36 : quality === 'medium' ? 22 : 12;

  const dots = useMemo(() => Array.from({ length: dotCount }, (_, i) => ({ x: -3.4 + ((i * 0.37) % 6.8), y: -1.1 + ((i * 0.23) % 3.8), z: -9.8 - ((i * 0.13) % 3.2) })), [dotCount]);
  const linePairs = useMemo(() => Array.from({ length: lineCount }, (_, i) => [i % dotCount, (i * 7 + 3) % dotCount] as const), [dotCount, lineCount]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    pointsRef.current?.children.forEach((dot, i) => {
      dot.position.x = dots[i].x + Math.cos(t * 0.12 + i) * (reducedMotion ? 0.004 : 0.02);
      const breathe = 0.75 + ((Math.sin(t * 0.7 + i * 0.2) + 1) * 0.25);
      dot.scale.setScalar(breathe);
    });
  });

  const draw = THREE.MathUtils.clamp((progress - 0.86) / 0.14, 0, 1);

  return (
    <group>
      <group ref={pointsRef}>
        {dots.map((dot, i) => (
          <mesh key={`dot-${i}`} position={[dot.x, dot.y, dot.z]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial transparent opacity={0.1 + activeStrength * 0.16} color={preset.secondary} depthWrite={false} />
          </mesh>
        ))}
      </group>
      {linePairs.map(([from, to], i) => {
        const a = dots[from];
        const b = dots[to];
        const center: [number, number, number] = [(a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2];
        const length = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
        const angle = Math.atan2(b.y - a.y, b.x - a.x);

        return (
          <mesh key={`line-${i}`} position={center} rotation={[0, 0, angle]}>
            <planeGeometry args={[length * draw, 0.008]} />
            <meshBasicMaterial transparent opacity={0.08 + activeStrength * 0.2} color={preset.accent} depthWrite={false} />
          </mesh>
        );
      })}
    </group>
  );
}
