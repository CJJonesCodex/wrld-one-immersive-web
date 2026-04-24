import type { FeaturedWorld, WorldId } from '../types/world';

interface ScrollbarNavProps {
  worlds: FeaturedWorld[];
  activeWorldId: WorldId;
  progress: number;
  onNavigate: (worldId: WorldId) => void;
  orientation?: 'vertical' | 'horizontal';
}

export function ScrollbarNav({ worlds, activeWorldId, progress, onNavigate, orientation = 'vertical' }: ScrollbarNavProps) {
  return (
    <div className="scrollbar-nav" data-orientation={orientation}>
      <div className="scrollbar-nav__track">
        <div className="scrollbar-nav__fill" style={orientation === 'vertical' ? { height: `${progress * 100}%` } : { width: `${progress * 100}%` }} />
      </div>
      {worlds.map((world) => (
        <button
          key={world.id}
          className={`scrollbar-nav__tick tap-target ${world.id === activeWorldId ? 'is-active' : ''}`}
          style={orientation === 'vertical' ? { top: `${world.scene.scrollTarget * 100}%` } : { left: `${world.scene.scrollTarget * 100}%` }}
          onClick={() => onNavigate(world.id)}
          aria-label={`Navigate to ${world.title}`}
        />
      ))}
    </div>
  );
}
