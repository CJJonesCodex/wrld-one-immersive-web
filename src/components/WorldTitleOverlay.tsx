import { useMemo, type CSSProperties } from 'react';
import { DEFAULT_VISUAL_MODE } from '../config/visualMode';
import { getWorldVfxPreset } from '../data/worldVfxPresets';
import type { ScenePhaseState } from '../systems/useScenePhase';
import type { FeaturedWorld, WorldId } from '../types/world';

interface WorldTitleOverlayProps {
  activeWorld: FeaturedWorld;
  progress: number;
  phaseState: ScenePhaseState;
  selectedWorldId: WorldId | null;
  drawerOpen: boolean;
  onOpenWorld: (worldId: WorldId) => void;
}

export function WorldTitleOverlay({ activeWorld, progress, phaseState, selectedWorldId, drawerOpen, onOpenWorld }: WorldTitleOverlayProps) {
  if (DEFAULT_VISUAL_MODE !== 'title-vfx') return null;

  const preset = getWorldVfxPreset(activeWorld.id);
  const isHidden =
    progress < 0.16 ||
    phaseState.phase === 'hero' ||
    Boolean(selectedWorldId) ||
    drawerOpen;

  const stageStyle = useMemo(
    () =>
      ({
        '--world-primary': preset.primary,
        '--world-secondary': preset.secondary,
        '--world-accent': preset.accent,
        '--world-bg-a': preset.backgroundA,
        '--world-bg-b': preset.backgroundB,
      }) as CSSProperties,
    [preset],
  );

  return (
    <section
      key={activeWorld.id}
      className={`world-title-stage ${isHidden ? 'is-hidden' : ''}`}
      data-world={activeWorld.id}
      data-preset={preset.presetId}
      style={stageStyle}
      aria-hidden={isHidden}
    >
      <p className="world-title-stage__eyebrow">{preset.eyebrow}</p>
      <h1 className="world-title-stage__title">
        <span>{preset.titleLines[0]}</span>
        <span>{preset.titleLines[1]}</span>
      </h1>
      <p className="world-title-stage__microcopy">{preset.microcopy}</p>
      <button className="world-title-stage__cta" onClick={() => onOpenWorld(activeWorld.id)}>
        View
      </button>
    </section>
  );
}
