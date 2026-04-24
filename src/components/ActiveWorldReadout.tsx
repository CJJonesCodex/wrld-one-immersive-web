import type { FeaturedWorld } from '../types/world';

interface ActiveWorldReadoutProps {
  world: FeaturedWorld;
  progress: number;
}

export function ActiveWorldReadout({ world }: ActiveWorldReadoutProps) {
  return (
    <div className="active-world-readout" style={{ ['--accent' as string]: world.colors.accent }}>
      <div className="active-world-readout__index">{world.indexLabel}</div>
      <div className="active-world-readout__title">{world.title}</div>
      <div className="active-world-readout__hint">Scroll to explore featured worlds</div>
    </div>
  );
}
