import type { QualityLevel } from '../../types/world';

interface RiftBloomWorldProps {
  opacity: number;
  objectCount: number;
  quality: QualityLevel;
  isMobileFit: boolean;
  reducedMotion: boolean;
}

export function RiftBloomWorld({ opacity, objectCount, isMobileFit }: RiftBloomWorldProps) {
  const petals = Math.max(8, Math.min(12, Math.floor(objectCount * 0.45)));

  return (
    <group position={[0, 0.15, -7.1]} scale={isMobileFit ? 0.82 : 1}>
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i / petals) * Math.PI * 2;
        return (
          <mesh key={i} rotation={[0, 0, angle]} position={[Math.cos(angle) * 0.45, Math.sin(angle) * 0.3, 0]}>
            <planeGeometry args={[0.9, 0.26]} />
            <meshBasicMaterial color={i % 3 === 0 ? '#ffd166' : i % 2 === 0 ? '#54d8ff' : '#fffdf7'} transparent opacity={0.26 * opacity} />
          </mesh>
        );
      })}
      <mesh>
        <circleGeometry args={[0.24, 32]} />
        <meshBasicMaterial color="#fff3d1" transparent opacity={0.7 * opacity} />
      </mesh>
    </group>
  );
}
