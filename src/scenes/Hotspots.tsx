import { Html } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';
import { Vector3Tuple } from 'three';
import { ZoneInfo } from '../components/HUD';

interface HotspotData extends ZoneInfo {
  position: Vector3Tuple;
}

interface HotspotsProps {
  onSelect: (zone: ZoneInfo) => void;
}

const hotspots: HotspotData[] = [
  {
    id: 'ZONE-01',
    title: 'Entry Gate',
    description: 'A ringed checkpoint where travelers sync with WRLD ONE signal frequencies.',
    position: [0, 2.2, -8],
  },
  {
    id: 'ZONE-02',
    title: 'Signal Corridor',
    description: 'Floating panel arrays transmit glyph streams and directional telemetry pulses.',
    position: [2.2, 2.8, -52],
  },
  {
    id: 'ZONE-03',
    title: 'Core Chamber',
    description: 'Energy nodes orbit the core lattice, revealing stable routes through fractured space.',
    position: [-2.6, 2.4, -102],
  },
  {
    id: 'ZONE-04',
    title: 'Rift Exit',
    description: 'A volatile portal shell that bends light before opening into the next world.',
    position: [0, 2.7, -160],
  },
];

function HotspotMesh({ position, onClick }: MeshProps & { onClick: () => void }) {
  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.35, 20, 20]} />
      <meshStandardMaterial color="#7ce1ff" emissive="#54d2ff" emissiveIntensity={1.5} />
      <Html center distanceFactor={12}>
        <button className="hotspot-label" type="button" tabIndex={-1}>
          inspect
        </button>
      </Html>
    </mesh>
  );
}

export function Hotspots({ onSelect }: HotspotsProps) {
  return (
    <group>
      {hotspots.map((hotspot) => (
        <HotspotMesh
          key={hotspot.id}
          position={hotspot.position}
          onClick={() => onSelect(hotspot)}
        />
      ))}
    </group>
  );
}
