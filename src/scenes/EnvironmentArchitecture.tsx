import { useMemo } from 'react';
import { CatmullRomCurve3, DoubleSide, Vector3 } from 'three';
import { Line } from '@react-three/drei';

interface EnvironmentArchitectureProps {
  detailedGrid: boolean;
  glowBoost: number;
}

export function EnvironmentArchitecture({ detailedGrid, glowBoost }: EnvironmentArchitectureProps) {
  const cablePoints = useMemo(() => {
    return Array.from({ length: 7 }).map((_, index) => {
      const z = -18 - index * 24;
      const curve = new CatmullRomCurve3([
        new Vector3(-8, 1.5 + Math.sin(index) * 0.8, z),
        new Vector3(-2, 3.4 + Math.cos(index * 0.5), z - 5),
        new Vector3(2, 2.2 + Math.sin(index * 0.7), z - 10),
        new Vector3(8, 1.8 + Math.cos(index), z - 16),
      ]);
      return curve.getPoints(60);
    });
  }, []);

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.2, -92]}>
        <planeGeometry args={[120, 320, detailedGrid ? 120 : 28, detailedGrid ? 320 : 80]} />
        <meshStandardMaterial
          color="#070c19"
          emissive="#11213a"
          emissiveIntensity={0.34 * glowBoost}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      <group position={[0, 1.7, -9]}>
        <mesh>
          <torusGeometry args={[5.8, 0.35, 32, 140]} />
          <meshStandardMaterial color="#4ec7ff" emissive="#3d94d6" emissiveIntensity={1.35 * glowBoost} />
        </mesh>
        <mesh rotation-y={Math.PI / 2}>
          <torusGeometry args={[3.8, 0.1, 20, 80]} />
          <meshStandardMaterial color="#89f2ff" emissive="#4da6d7" emissiveIntensity={0.85 * glowBoost} />
        </mesh>
      </group>

      {Array.from({ length: 9 }).map((_, i) => (
        <group key={`rib-${i}`} position={[0, 0.9, -16 - i * 22]}>
          <mesh position={[0, 3.4, 0]}>
            <torusGeometry args={[6.4, 0.08, 12, 70, Math.PI]} />
            <meshStandardMaterial color="#233552" emissive="#1b5a8c" emissiveIntensity={0.6 * glowBoost} />
          </mesh>
          <mesh position={[-6.4, 0.5, 0]}>
            <boxGeometry args={[0.22, 5.5, 0.22]} />
            <meshStandardMaterial color="#121d33" emissive="#1f3f68" emissiveIntensity={0.45 * glowBoost} />
          </mesh>
          <mesh position={[6.4, 0.5, 0]}>
            <boxGeometry args={[0.22, 5.5, 0.22]} />
            <meshStandardMaterial color="#121d33" emissive="#1f3f68" emissiveIntensity={0.45 * glowBoost} />
          </mesh>
        </group>
      ))}

      <group position={[0, 2.2, -182]}>
        <mesh scale={[1.2, 1.8, 1]}>
          <ringGeometry args={[5.2, 6.8, 70]} />
          <meshStandardMaterial
            color="#8e79fb"
            emissive="#5030af"
            emissiveIntensity={1.2 * glowBoost}
            side={DoubleSide}
          />
        </mesh>
      </group>

      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={`silhouette-${i}`} position={[((i % 7) - 3) * 8, -0.3, -55 - Math.floor(i / 7) * 64]}>
          <boxGeometry args={[3.2, 8 + (i % 3) * 2.8, 1.2]} />
          <meshStandardMaterial color="#070913" emissive="#1a1f35" emissiveIntensity={0.28} />
        </mesh>
      ))}

      {cablePoints.map((points, i) => (
        <Line
          key={`cable-${i}`}
          points={points}
          color={i % 2 === 0 ? '#5fc7ff' : '#9580ff'}
          lineWidth={1.1}
          transparent
          opacity={0.35 + i * 0.03}
        />
      ))}
    </group>
  );
}
