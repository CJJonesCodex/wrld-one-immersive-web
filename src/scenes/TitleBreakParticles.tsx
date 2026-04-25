import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Points, PointsMaterial } from 'three';
import type { VfxPreset } from '../data/worldVfxPresets';
import type { WorldRevealPreset, WorldRevealRuntime } from '../types/reveal';
import type { FeaturedWorld, QualityLevel } from '../types/world';

interface TitleBreakParticlesProps {
  activeWorld: FeaturedWorld;
  revealPreset: WorldRevealPreset;
  revealRuntime: WorldRevealRuntime;
  vfxPreset: VfxPreset;
  quality: QualityLevel;
  isMobileFit: boolean;
  reducedMotion: boolean;
}

const styleColors: Record<WorldRevealPreset['breakStyle'], string[]> = {
  'dew-dissolve': ['#7cffb2', '#ffd166', '#fffdf7'],
  'signal-slice': ['#54d8ff', '#fffdf7'],
  'halo-collapse': ['#a78bfa', '#ffd166'],
  'ribbon-smear': ['#ff7a66', '#a78bfa', '#ffb4c8'],
  'petal-aperture': ['#ffd166', '#54d8ff', '#fffdf7'],
  'constellation-deconstruct': ['#7cffb2', '#fffdf7'],
};

export function TitleBreakParticles({ revealPreset, revealRuntime, quality, isMobileFit, reducedMotion }: TitleBreakParticlesProps) {
  const pointsRef = useRef<Points<BufferGeometry, PointsMaterial>>(null);
  const shouldRender = revealRuntime.phase === 'breakaway' || revealRuntime.phase === 'revealed' || revealRuntime.phase === 'exit';
  if (!shouldRender) return null;

  const density = isMobileFit ? revealPreset.mobileDensityScale : 1;
  const motionScale = reducedMotion ? 0.25 : 1;
  const count = Math.max(8, Math.floor(revealPreset.shardCount[quality] * density * (reducedMotion ? 0.25 : 1)));

  const geometry = useMemo(() => {
    const geom = new BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = styleColors[revealPreset.breakStyle];

    for (let i = 0; i < count; i += 1) {
      const p = i * 3;
      positions[p] = (Math.sin(i * 1.37) * 1.6) / (isMobileFit ? 1.4 : 1);
      positions[p + 1] = Math.cos(i * 1.11) * 0.62;
      positions[p + 2] = -5.6 - (i % 7) * 0.22;
      const color = new Color(palette[i % palette.length]);
      colors[p] = color.r;
      colors[p + 1] = color.g;
      colors[p + 2] = color.b;
    }

    geom.setAttribute('position', new BufferAttribute(positions, 3));
    geom.setAttribute('color', new BufferAttribute(colors, 3));
    return geom;
  }, [count, isMobileFit, revealPreset.breakStyle]);

  const particleOpacity = Math.max(0, revealRuntime.breakProgress * (1 - revealRuntime.revealProgress * 0.8));

  useFrame(() => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position as BufferAttribute;
    for (let i = 0; i < count; i += 1) {
      const p = i * 3;
      const driftX = Math.sin(i * 0.7) * 0.002 * revealRuntime.breakProgress * motionScale;
      const driftY = (revealPreset.breakStyle === 'dew-dissolve' ? 1 : -1) * 0.002 * revealRuntime.breakProgress * motionScale;
      positions.array[p] += driftX;
      positions.array[p + 1] += driftY;
    }
    positions.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry} position={[0, 0.2, 0]}>
      <pointsMaterial
        size={reducedMotion ? 0.02 : 0.035}
        sizeAttenuation
        transparent
        opacity={particleOpacity}
        depthWrite={false}
        vertexColors
        blending={AdditiveBlending}
      />
    </points>
  );
}
