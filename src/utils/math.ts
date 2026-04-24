export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  if (inMax === inMin) return outMin;
  const t = (value - inMin) / (inMax - inMin);
  return outMin + (outMax - outMin) * t;
}

export function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = clamp01((value - edge0) / (edge1 - edge0 || 1));
  return t * t * (3 - 2 * t);
}

export function inverseLerp(a: number, b: number, value: number): number {
  if (a === b) return 0;
  return (value - a) / (b - a);
}

export function distanceToRange(value: number, range: [number, number]): number {
  const [start, end] = range;
  const span = Math.max(0.0001, end - start);
  if (value < start) return (start - value) / span;
  if (value > end) return (value - end) / span;
  return 0;
}

export function getActiveStrength(progress: number, range: [number, number]): number {
  const [start, end] = range;
  const center = (start + end) / 2;
  const half = Math.max((end - start) / 2, 0.0001);
  const dist = Math.abs(progress - center);
  const norm = clamp01(dist / (half * 1.8));
  return 1 - smoothstep(0, 1, norm);
}

export function safeLerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp01(t);
}
