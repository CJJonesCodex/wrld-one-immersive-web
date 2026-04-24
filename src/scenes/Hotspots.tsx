import { Html } from '@react-three/drei';

interface HotspotsProps {
  onSelect: () => void;
}

export function Hotspots({ onSelect }: HotspotsProps) {
  return (
    <group>
      <mesh position={[-1.35, 1.7, -101.6]} onClick={onSelect}>
        <sphereGeometry args={[0.11, 18, 18]} />
        <meshStandardMaterial color="#d8e2ef" emissive="#93a6bf" emissiveIntensity={0.2} />
        <Html center distanceFactor={10} position={[0.26, 0.12, 0]}>
          <button className="hotspot-label" type="button" tabIndex={-1}>
            View
          </button>
        </Html>
      </mesh>
    </group>
  );
}
