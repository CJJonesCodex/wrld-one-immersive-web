import type { FeaturedWorld, WorldId } from '../types/world';
import { scrollToWorldSection } from '../systems/scrollToWorldSection';

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
            scrollToWorldSection(world.id);
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
