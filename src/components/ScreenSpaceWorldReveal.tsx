import { useEffect, useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { FeaturedWorld } from '../types/world';
import type { VisualContinuityState } from '../systems/useVisualContinuity';
import type { WorldRevealRuntime } from '../types/reveal';
import { clamp01 } from '../utils/math';
import { warnIfBlankRisk } from '../utils/devWarnings';

interface ScreenSpaceWorldRevealProps {
  activeWorld: FeaturedWorld;
  continuity: VisualContinuityState;
  revealRuntime: WorldRevealRuntime;
  isMobileFit: boolean;
  drawerOpen: boolean;
  detailOpen: boolean;
}

type ScreenRevealVars = CSSProperties & {
  '--world-primary': string;
  '--world-secondary': string;
  '--world-accent': string;
  '--reveal-opacity': number;
  '--break-progress': number;
  '--reveal-progress': number;
};

export function ScreenSpaceWorldReveal({
  activeWorld,
  continuity,
  revealRuntime,
  isMobileFit,
  drawerOpen,
  detailOpen,
}: ScreenSpaceWorldRevealProps) {
  const computedOpacity = useMemo(() => {
    let nextOpacity = continuity.showWorldReveal ? continuity.revealOpacity : 0;

    if (!continuity.showHero && continuity.titleOpacity < 0.25) {
      nextOpacity = Math.max(nextOpacity, 0.55);
    }

    if (!continuity.showHero && continuity.titleMode === 'hidden') {
      nextOpacity = Math.max(nextOpacity, 0.75);
    }

    if (revealRuntime.phase === 'revealed' || revealRuntime.phase === 'exit') {
      nextOpacity = Math.max(nextOpacity, 0.75);
    }

    if (drawerOpen || detailOpen) {
      nextOpacity = Math.max(0.16, nextOpacity * 0.4);
    }

    if (continuity.showHero) {
      nextOpacity = 0;
    }

    return clamp01(nextOpacity);
  }, [continuity, detailOpen, drawerOpen, revealRuntime.phase]);

  useEffect(() => {
    warnIfBlankRisk({
      phase: continuity.showHero ? 'hero' : revealRuntime.phase,
      titleOpacity: continuity.titleOpacity,
      revealOpacity: continuity.revealOpacity,
      screenRevealOpacity: computedOpacity,
    });
  }, [computedOpacity, continuity.revealOpacity, continuity.showHero, continuity.titleOpacity, revealRuntime.phase]);

  const style: ScreenRevealVars = {
    '--world-primary': activeWorld.colors.primary,
    '--world-secondary': activeWorld.colors.secondary,
    '--world-accent': activeWorld.colors.accent,
    '--reveal-opacity': computedOpacity,
    '--break-progress': revealRuntime.breakProgress,
    '--reveal-progress': revealRuntime.revealProgress,
  };

  return (
    <div
      className="screen-world-reveal"
      aria-hidden="true"
      data-world={activeWorld.id}
      data-phase={revealRuntime.phase}
      data-mobile-fit={String(isMobileFit)}
      style={style}
    >
      <div className="screen-world-reveal__field" />
      <div className="screen-world-reveal__structure" />
      <div className="screen-world-reveal__particles" />
    </div>
  );
}
