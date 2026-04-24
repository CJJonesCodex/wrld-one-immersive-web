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
    description: 'A giant portal ring that calibrates incoming travelers before corridor insertion.',
    lore: 'The gate listens for harmonic keys and then opens a safe lane.',
    mediaSlot: 'gate-loop',
    futureAssetHint: 'Upload /public/media/gate-loop.webm + gate-loop.mp4 and gate-poster.webp.',
    position: [0, 3, -11],
  },
  {
    id: 'ZONE-02',
    title: 'Signal Corridor',
    description: 'Lateral drift space where data-panels pulse with route telemetry.',
    lore: 'Corridor glyphs reveal hidden branch paths based on resonance timing.',
    mediaSlot: 'corridor-loop',
    futureAssetHint: 'Upload /public/media/corridor-loop.webm + corridor-loop.mp4 and corridor-poster.webp.',
    position: [3.8, 3.05, -56],
  },
  {
    id: 'ZONE-03',
    title: 'Core Chamber',
    description: 'A vertical living-world media portal hovers beside the world core for playback validation.',
    lore: 'Living Macro Sample now occupies the core-loop media slot as a proving ground for future AI-generated living-world footage.',
    mediaSlot: 'core-loop',
    futureAssetHint: 'core-loop media slot now streams Living Macro Sample and is reserved for future AI-generated living-world footage.',
    position: [-2.45, 2.95, -103.1],
  },
  {
    id: 'ZONE-04',
    title: 'Rift Exit',
    description: 'The final portal frame where spacetime distortion peaks before transition.',
    lore: 'Crossing at peak charge grants a cleaner jump into the next chapter.',
    mediaSlot: 'rift-loop',
    futureAssetHint: 'Upload /public/media/rift-loop.webm + rift-loop.mp4 and rift-poster.webp.',
    position: [0, 3.2, -164],
  },
];

function HotspotMesh({ position, onClick }: MeshProps & { onClick: () => void }) {
  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.28, 18, 18]} />
      <meshStandardMaterial color="#8de7ff" emissive="#4ec7ef" emissiveIntensity={1.75} />
      <Html center distanceFactor={11}>
        <button className="hotspot-label" type="button" tabIndex={-1}>
          open
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
