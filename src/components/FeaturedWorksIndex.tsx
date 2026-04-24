import type { FeaturedWorld } from '../data/featuredWorlds';

interface FeaturedWorksIndexProps {
  worlds: FeaturedWorld[];
  activeIndex: number;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onSelect: (index: number) => void;
}

export function FeaturedWorksIndex({ worlds, activeIndex, collapsed, onToggleCollapse, onSelect }: FeaturedWorksIndexProps) {
  return (
    <nav className={`featured-index ${collapsed ? 'collapsed' : ''}`} aria-label="Featured worlds index">
      <button
        type="button"
        className="featured-index-toggle"
        onClick={onToggleCollapse}
        aria-label="Toggle featured worlds list"
        data-cursor="interactive"
      >
        Featured Worlds
      </button>
      <ol>
        {worlds.map((world, index) => (
          <li key={world.id}>
            <button
              type="button"
              className={activeIndex === index ? 'active' : ''}
              aria-label={`Go to ${world.title}`}
              onClick={() => onSelect(index)}
              data-cursor="interactive"
            >
              <span>{world.indexLabel}</span>
              <em>{world.title}</em>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
