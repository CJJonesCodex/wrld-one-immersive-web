import type { ViewportMode } from '../systems/useViewportMode';

interface ViewportModeToggleProps {
  mode: ViewportMode;
  onToggle: () => void;
  compact?: boolean;
}

export function ViewportModeToggle({ mode, onToggle, compact = false }: ViewportModeToggleProps) {
  return (
    <button className={`viewport-mode-toggle ${compact ? 'is-compact' : ''} is-active`} onClick={onToggle}>
      {mode === 'cinematic' ? 'Mobile Version' : 'Cinematic Version'}
    </button>
  );
}

