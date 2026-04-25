import { useMemo, type CSSProperties } from 'react';
import type { VfxPreset } from '../data/worldVfxPresets';
import type { VisualContinuityState } from '../systems/useVisualContinuity';
import type { ScenePhase } from '../systems/useScenePhase';
import type { WorldRevealRuntime } from '../types/reveal';
import type { FeaturedWorld, WorldId } from '../types/world';

interface StableWorldTitleProps {
  activeWorld: FeaturedWorld;
  preset: VfxPreset;
  progress: number;
  phase: ScenePhase;
  revealRuntime: WorldRevealRuntime;
  continuity: VisualContinuityState;
  isMobileFit: boolean;
  drawerOpen: boolean;
  detailOpen: boolean;
  selectedWorldId: WorldId | null;
  onView: () => void;
}

export function StableWorldTitle({
  activeWorld,
  preset,
  phase,
  revealRuntime,
  isMobileFit,
  drawerOpen,
  detailOpen,
  selectedWorldId,
  onView,
}: StableWorldTitleProps) {
  const isHidden = phase === 'hero' || detailOpen || Boolean(selectedWorldId);
  const isDimmed = !isHidden && drawerOpen;

  const baseOpacity = isHidden ? 0 : isDimmed ? 0.14 : 1;
  const stableOpacity =
    !isHidden &&
    (revealRuntime.phase === 'breakaway' || revealRuntime.phase === 'revealed' || revealRuntime.phase === 'exit')
      ? Math.max(0.88, baseOpacity)
      : baseOpacity;

  const showCta =
    !isHidden &&
    !isDimmed &&
    (revealRuntime.phase === 'intro' ||
      revealRuntime.phase === 'hold' ||
      revealRuntime.phase === 'revealed' ||
      revealRuntime.phase === 'exit');

  const style = useMemo(
    () =>
      ({
        '--world-primary': preset.primary,
        '--world-secondary': preset.secondary,
        '--world-accent': preset.accent,
        opacity: stableOpacity,
      }) as CSSProperties,
    [preset.accent, preset.primary, preset.secondary, stableOpacity],
  );

  return (
    <section
      className={`stable-world-title ${isHidden ? 'is-hidden' : ''} ${isDimmed ? 'is-dimmed' : ''}`.trim()}
      data-world={activeWorld.id}
      data-mobile-fit={String(isMobileFit)}
      style={style}
      aria-hidden={isHidden}
    >
      <p className="stable-world-title__eyebrow">{preset.eyebrow}</p>
      <h1 className="stable-world-title__title">
        <span>{preset.titleLines[0]}</span>
        <span>{preset.titleLines[1]}</span>
      </h1>
      <p className="stable-world-title__microcopy">{preset.microcopy}</p>
      {showCta ? (
        <button className="stable-world-title__cta" onClick={onView}>
          View
        </button>
      ) : null}
    </section>
  );
}
