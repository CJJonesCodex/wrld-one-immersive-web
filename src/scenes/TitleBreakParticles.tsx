import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Points, PointsMaterial } from 'three';
import type { VfxPreset } from '../data/worldVfxPresets';
import type { WorldRevealPreset, WorldRevealRuntime } from '../types/reveal';
import type { FeaturedWorld, QualityLevel } from '../types/world';
import type { VisualContinuityState } from '../systems/useVisualContinuity';

interface TitleBreakParticlesProps {
  activeWorld: FeaturedWorld;
  revealPreset: WorldRevealPreset;
  revealRuntime: WorldRevealRuntime;
  continuity: VisualContinuityState;
  vfxPreset: VfxPreset;
  quality: QualityLevel;
  isMobileFit: boolean;
  reducedMotion: boolean;
}

export function TitleBreakParticles({ revealPreset, revealRuntime, continuity, vfxPreset, quality, isMobileFit, reducedMotion }: TitleBreakParticlesProps) {
  const pointsRef = useRef<Points<BufferGeometry, PointsMaterial>>(null);
  if (!continuity.showBreakParticles) return null;

  const qualityMin = quality === 'low' ? 12 : quality === 'medium' ? 24 : 40;
  const baseCount = Math.floor(revealPreset.shardCount[quality] * (isMobileFit ? 0.85 : 1) * (reducedMotion ? 0.65 : 1));
  const count = Math.max(qualityMin, baseCount);

  const geometry = useMemo(() => {
    const geom = new BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [vfxPreset.primary, vfxPreset.secondary, vfxPreset.accent];

    for (let i = 0; i < count; i += 1) {
      const p = i * 3;
      positions[p] = Math.sin(i * 1.13) * (isMobileFit ? 1.1 : 1.5);
      positions[p + 1] = Math.cos(i * 1.27) * 0.52;
      positions[p + 2] = -5.4 - (i % 6) * 0.18;
      const color = new Color(palette[i % palette.length]);
      colors[p] = color.r;
      colors[p + 1] = color.g;
      colors[p + 2] = color.b;
    }

    geom.setAttribute('position', new BufferAttribute(positions, 3));
    geom.setAttribute('color', new BufferAttribute(colors, 3));
    return geom;
  }, [count, isMobileFit, vfxPreset.accent, vfxPreset.primary, vfxPreset.secondary]);

  const rawOpacity = continuity.particlesOpacity;
  const particleOpacity = isMobileFit ? Math.max(0.35, Math.min(0.65, rawOpacity)) : Math.max(0.55, Math.min(0.9, rawOpacity));

  useFrame(() => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position as BufferAttribute;
    const travel = isMobileFit ? 0.0011 : 0.0018;
    for (let i = 0; i < count; i += 1) {
      const p = i * 3;
      const driftX = Math.sin(i * 0.7) * travel * revealRuntime.breakProgress;
      const driftY = (revealPreset.breakStyle === 'dew-dissolve' ? 1 : -1) * travel * revealRuntime.breakProgress;
      positions.array[p] += driftX;
      positions.array[p + 1] += driftY;
    }
    positions.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry} position={[0, 0.2, 0]}>
      <pointsMaterial size={reducedMotion ? 0.016 : 0.03} sizeAttenuation transparent opacity={particleOpacity} depthWrite={false} vertexColors blending={AdditiveBlending} />
    </points>
  );
}
