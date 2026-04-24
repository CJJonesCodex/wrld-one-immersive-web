import { DoubleSide } from 'three';
import { MeshDistortMaterial } from '@react-three/drei';

interface ZoneObjectsProps {
  detailedGrid: boolean;
}

export function ZoneObjects({ detailedGrid }: ZoneObjectsProps) {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.2, -84]}>
        <planeGeometry args={[90, 280, detailedGrid ? 80 : 24, detailedGrid ? 220 : 70]} />
        <meshStandardMaterial color="#0b1020" wireframe opacity={0.45} transparent />
      </mesh>

      {Array.from({ length: 8 }).map((_, i) => (
        <group key={`arch-${i}`} position={[0, 0.8, -16 - i * 22]}>
          <mesh position={[0, 3.2, 0]}>
            <torusGeometry args={[5.4, 0.08, 16, 60, Math.PI]} />
            <meshStandardMaterial color="#283a5f" emissive="#1f5f8f" emissiveIntensity={0.55} />
          </mesh>
          <mesh position={[-5.4, 0.6, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 5.2, 8]} />
            <meshStandardMaterial color="#1a2642" emissive="#173758" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[5.4, 0.6, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 5.2, 8]} />
            <meshStandardMaterial color="#1a2642" emissive="#173758" emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}

      <group position={[0, 1.4, -8]}>
        <mesh>
          <torusGeometry args={[3.8, 0.25, 26, 100]} />
          <meshStandardMaterial color="#5dc8ff" emissive="#255f8f" emissiveIntensity={1.6} />
        </mesh>
        <mesh rotation-y={Math.PI / 2.5}>
          <torusGeometry args={[2.5, 0.08, 20, 50]} />
          <meshStandardMaterial color="#7be8ff" emissive="#3477b0" emissiveIntensity={1.2} />
        </mesh>
      </group>

      <group position={[0, 1.2, -52]}>
        {Array.from({ length: 14 }).map((_, i) => (
          <mesh key={`panel-${i}`} position={[((i % 2) - 0.5) * 6.4, (i % 7) * 0.9 - 2.4, -i * 1.8]}>
            <boxGeometry args={[1.4, 0.8, 0.2]} />
            <meshStandardMaterial color="#29395d" emissive="#256c9b" emissiveIntensity={0.7} />
          </mesh>
        ))}
      </group>

      <group position={[0, 2, -102]}>
        <mesh>
          <sphereGeometry args={[1.1, 24, 24]} />
          <meshStandardMaterial color="#26386b" emissive="#394ca3" emissiveIntensity={0.7} />
        </mesh>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <mesh key={`node-${i}`} position={[Math.cos(angle) * 4, Math.sin(angle) * 2, 0]}>
              <icosahedronGeometry args={[0.45, 0]} />
              <meshStandardMaterial color="#6bd0ff" emissive="#4a8de0" emissiveIntensity={1.8} />
            </mesh>
          );
        })}
      </group>

      <group position={[0, 2.5, -160]}>
        <mesh>
          <torusKnotGeometry args={[2.4, 0.5, 120, 14]} />
          <MeshDistortMaterial
            color="#a17dff"
            emissive="#5523a1"
            emissiveIntensity={1.8}
            distort={0.35}
            speed={2.2}
          />
        </mesh>
        <mesh scale={1.35}>
          <ringGeometry args={[2.6, 3.9, 64]} />
          <meshStandardMaterial
            color="#a58bff"
            emissive="#643cd7"
            emissiveIntensity={1.2}
            side={DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}
