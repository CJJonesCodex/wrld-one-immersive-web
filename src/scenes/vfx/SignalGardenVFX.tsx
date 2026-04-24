import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { getWorldVfxPreset } from '../../data/worldVfxPresets';
import type { QualityLevel } from '../../types/world';

interface SignalGardenVFXProps {
  quality: QualityLevel;
  activeStrength: number;
  reducedMotion: boolean;
}

export function SignalGardenVFX({ quality, activeStrength, reducedMotion }: SignalGardenVFXProps) {
  const lineGroupRef = useRef<THREE.Group>(null);
  const nodeGroupRef = useRef<THREE.Group>(null);
  const sweepRef = useRef<THREE.Mesh>(null);
  const preset = getWorldVfxPreset('signal-garden');
  const lineCount = quality === 'high' ? 22 : quality === 'medium' ? 14 : 8;
  const nodeCount = quality === 'high' ? 64 : quality === 'medium' ? 36 : 18;

  const lines = useMemo(
    () => Array.from({ length: lineCount }, (_, i) => ({ x: -3 + ((i * 0.57) % 6), y: -1 + ((i * 0.31) % 3.2), z: -4 - ((i * 0.22) % 5), rot: (i % 4) * 0.15 })),
    [lineCount],
  );
  const nodes = useMemo(
    () => Array.from({ length: nodeCount }, (_, i) => ({ x: -3 + ((i * 0.47) % 6), y: -1 + ((i * 0.37) % 3.3), z: -5 - ((i * 0.11) % 4.3), phase: i * 0.19 })),
    [nodeCount],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    lineGroupRef.current?.children.forEach((line, i) => {
      line.position.x = lines[i].x + Math.sin(t * 0.18 + i) * (reducedMotion ? 0.01 : 0.06);
    });
    nodeGroupRef.current?.children.forEach((node, i) => {
      const pulse = 0.75 + (Math.sin(t * 1.2 + nodes[i].phase) + 1) * 0.25;
      node.scale.setScalar(pulse);
    });
    if (sweepRef.current) {
      sweepRef.current.position.x = -3.1 + ((t / 4.8) % 1) * 6.2;
    }
  });

  return (
    <group>
      <group ref={lineGroupRef}>
        {lines.map((line, i) => (
          <mesh key={i} position={[line.x, line.y, line.z]} rotation={[0, 0, line.rot]}>
            <planeGeometry args={[1.9, 0.01]} />
            <meshBasicMaterial transparent opacity={0.1 + activeStrength * 0.2} color={preset.secondary} depthWrite={false} />
          </mesh>
        ))}
      </group>
      <group ref={nodeGroupRef}>
        {nodes.map((node, i) => (
          <mesh key={i} position={[node.x, node.y, node.z]}>
            <sphereGeometry args={[0.03, 10, 10]} />
            <meshBasicMaterial transparent opacity={0.2 + activeStrength * 0.2} color={preset.accent} depthWrite={false} />
          </mesh>
        ))}
      </group>
      <mesh ref={sweepRef} position={[-3.1, 0.6, -6.6]}>
        <planeGeometry args={[6.2, 0.06]} />
        <meshBasicMaterial transparent opacity={0.06 + activeStrength * 0.08} color={preset.primary} depthWrite={false} />
      </mesh>
    </group>
  );
}
