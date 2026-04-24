import { Html } from '@react-three/drei';

interface HotspotsProps {
  onSelect: () => void;
}

export function Hotspots({ onSelect }: HotspotsProps) {
  return (
    <group>
      <mesh position={[-1.9, 1.32, -99.8]} onClick={onSelect}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#fff4cf" emissive="#ffd58d" emissiveIntensity={0.22} />
        <Html center distanceFactor={11} position={[0.22, -0.18, 0]}>
          <button className="hotspot-label" type="button" tabIndex={-1} data-cursor="interactive">
            View
          </button>
        </Html>
      </mesh>
    </group>
  );
}
