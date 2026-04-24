import type { FeaturedWorld, WorldId } from '../types/world';
import { scrollToProgress } from '../systems/useScrollProgress';

interface FeaturedWorksIndexProps {
  worlds: FeaturedWorld[];
  activeWorldId: WorldId;
  onNavigate: (worldId: WorldId) => void;
  variant?: 'desktop' | 'mobile';
}

export function FeaturedWorksIndex({ worlds, activeWorldId, onNavigate, variant = 'desktop' }: FeaturedWorksIndexProps) {
  return (
    <nav className="featured-index" data-variant={variant}>
      <p className="featured-index__heading">Featured Worlds</p>
      {worlds.map((world) => (
        <button
          key={world.id}
          className={`featured-index__row tap-target ${world.id === activeWorldId ? 'is-active' : ''}`}
          onClick={() => {
            scrollToProgress(world.scene.scrollTarget);
            onNavigate(world.id);
          }}
          aria-label={`Navigate to ${world.title}`}
        >
          <span>{world.indexLabel}</span>
          <span>{world.title}</span>
        </button>
      ))}
    </nav>
  );
}
