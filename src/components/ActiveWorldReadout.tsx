import type { FeaturedWorld } from '../types/world';

interface ActiveWorldReadoutProps {
  world: FeaturedWorld;
  progress: number;
  isMobile: boolean;
  isMobileFit: boolean;
}

export function ActiveWorldReadout({ world, progress, isMobile, isMobileFit }: ActiveWorldReadoutProps) {
  const opacity = isMobile ? Math.min(1, Math.max(0, (progress - 0.18) / 0.08)) : Math.min(1, Math.max(0, (progress - 0.16) / 0.08));
  return (
    <div className={`active-world-readout ${isMobileFit ? 'is-mobile-fit' : ''}`} style={{ ['--accent' as string]: world.colors.accent, opacity }}>
      <div className="active-world-readout__index">{world.indexLabel}</div>
      <div className="active-world-readout__title">{world.title}</div>
      <div className="active-world-readout__hint">Scroll to explore featured worlds</div>
    </div>
  );
}
