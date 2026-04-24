import type { QualityConfig } from '../systems/useQuality';

interface MediaPlanesProps {
  quality: QualityConfig;
  activeIndex: number;
  onSelectCore: () => void;
}

export function MediaPlanes({ quality, activeIndex }: MediaPlanesProps) {
  return (
    <group>
      <mesh position={[-1.4, 2.3, -98]} rotation={[0, 0.24, 0]}>
        <torusGeometry args={[1.5, 0.06, 18, 96]} />
        <meshStandardMaterial
          color="#ffd5a0"
          emissive={activeIndex === 2 ? '#ffeac6' : '#ffc996'}
          emissiveIntensity={quality.level === 'high' ? 0.24 : 0.14}
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  );
}
