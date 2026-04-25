import type { ViewportMode } from '../systems/useViewportMode';

interface ViewModeButtonProps {
  mode: ViewportMode;
  onToggle: () => void;
  compact?: boolean;
}

export function ViewModeButton({ mode, onToggle, compact = false }: ViewModeButtonProps) {
  const label = mode === 'mobile-fit' ? 'Cinematic Version' : 'Mobile Version';
  return (
    <button type="button" className={`viewport-mode-toggle ${mode === 'mobile-fit' ? 'is-active' : ''} ${compact ? 'is-compact' : ''}`} onClick={onToggle}>
      {label}
    </button>
  );
}
