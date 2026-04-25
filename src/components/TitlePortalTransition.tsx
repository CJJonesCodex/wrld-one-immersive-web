import { useMemo, type CSSProperties } from 'react';
import type { FeaturedWorld, WorldId } from '../types/world';
import type { VfxPreset } from '../data/worldVfxPresets';
import { getWorldRevealPreset } from '../data/worldRevealPresets';
import type { WorldRevealRuntime } from '../types/reveal';
import { DEFAULT_VISUAL_MODE } from '../config/visualMode';
import type { VisualContinuityState } from '../systems/useVisualContinuity';
import type { ViewportMode } from '../systems/useViewportMode';

interface TitlePortalTransitionProps {
  activeWorld: FeaturedWorld;
  preset: VfxPreset;
  revealRuntime: WorldRevealRuntime;
  continuity: VisualContinuityState;
  viewportMode: ViewportMode;
  isMobileFit: boolean;
  reducedMotion: boolean;
  drawerOpen: boolean;
  detailOpen: boolean;
  phase: 'hero' | 'intro' | 'rail' | 'focus' | 'bloom';
  selectedWorldId: WorldId | null;
  onView: () => void;
}

type Fragment = { text: string; index: number; key: string };

function splitLine(line: string, byWord: boolean): Fragment[] {
  if (byWord) {
    const words = line.split(' ');
    return words.map((word, index) => ({ text: `${word}${index < words.length - 1 ? ' ' : ''}`, index, key: `${word}-${index}` }));
  }
  return Array.from(line).map((char, index) => ({ text: char, index, key: `${char}-${index}` }));
}

export function TitlePortalTransition({
  activeWorld,
  preset,
  revealRuntime,
  continuity,
  viewportMode,
  isMobileFit,
  reducedMotion,
  drawerOpen,
  detailOpen,
  phase,
  selectedWorldId,
  onView,
}: TitlePortalTransitionProps) {
  if (DEFAULT_VISUAL_MODE !== 'title-vfx') return null;
  const revealPreset = getWorldRevealPreset(activeWorld.id);

  const hidden = phase === 'hero';
  const resolvedTitleMode =
    !continuity.showHero && continuity.titleMode === 'hidden'
      ? revealRuntime.phase === 'revealed' || revealRuntime.phase === 'exit'
        ? 'compact'
        : 'ghost'
      : continuity.titleMode;

  let safeTitleOpacity = continuity.titleOpacity;
  if (phase !== 'hero') {
    safeTitleOpacity = Math.max(safeTitleOpacity, 0.35);
  }

  if (drawerOpen || detailOpen || selectedWorldId) {
    safeTitleOpacity = Math.max(0.12, Math.min(safeTitleOpacity, 0.2));
  }

  const byWord = isMobileFit;
  const lines = preset.titleLines.map((line) => splitLine(line, byWord));
  const totalFragments = lines.reduce((sum, line) => sum + line.length, 0);
  const showFallbackTitle = revealRuntime.breakProgress > 0.55 || revealRuntime.phase === 'revealed' || revealRuntime.phase === 'exit';

  const style = useMemo(
    () =>
      ({
        '--world-primary': preset.primary,
        '--world-secondary': preset.secondary,
        '--world-accent': preset.accent,
        '--break-progress': revealRuntime.breakProgress,
        '--reveal-progress': revealRuntime.revealProgress,
        opacity: safeTitleOpacity,
      }) as CSSProperties,
    [preset, revealRuntime.breakProgress, revealRuntime.revealProgress, safeTitleOpacity],
  );

  const hideCta = resolvedTitleMode === 'compact' || resolvedTitleMode === 'ghost' || (revealRuntime.phase === 'breakaway' && revealRuntime.breakProgress > 0.3);
  const hideMicrocopy =
    resolvedTitleMode === 'compact' ||
    resolvedTitleMode === 'ghost' ||
    (isMobileFit && typeof window !== 'undefined' && window.innerHeight <= 700 && revealRuntime.localProgress > 0.22) ||
    (revealRuntime.phase === 'breakaway' && isMobileFit && typeof window !== 'undefined' && window.innerHeight <= 720);

  let globalIndex = 0;

  return (
    <section
      className={`title-portal ${hidden ? 'is-hidden' : ''} title-portal--${resolvedTitleMode} ${reducedMotion ? 'is-reduced-motion' : ''}`}
      data-world={activeWorld.id}
      data-break-style={revealPreset.breakStyle}
      data-mobile-fit={String(isMobileFit)}
      data-viewport-mode={viewportMode}
      data-phase={revealRuntime.phase}
      style={style}
      aria-hidden={hidden}
    >
      <p className="title-portal__eyebrow">{preset.eyebrow}</p>
      <h1 className="title-portal__title title-portal__title--fragments">
        {lines.map((line, lineIndex) => (
          <span className="title-portal__line" key={`line-${lineIndex}`}>
            {line.map((fragment) => {
              const index = globalIndex;
              globalIndex += 1;
              const wave = Math.sin(index * 1.7);
              const waveY = Math.cos(index * 1.3);
              const centerOffset = index - totalFragments / 2;
              const sign = centerOffset >= 0 ? 1 : -1;
              const centerAbs = Math.abs(centerOffset);
              return (
                <span
                  key={`${lineIndex}-${fragment.key}`}
                  className="title-fragment"
                  style={
                    {
                      '--fragment-index': index,
                      '--fragment-total': totalFragments,
                      '--fragment-wave': wave,
                      '--fragment-wave-y': waveY,
                      '--fragment-center-offset': centerOffset,
                      '--fragment-sign': sign,
                      '--fragment-center-abs': centerAbs,
                      '--break-progress': revealRuntime.breakProgress,
                      '--reveal-progress': revealRuntime.revealProgress,
                      '--world-accent': preset.accent,
                    } as CSSProperties
                  }
                >
                  {fragment.text}
                </span>
              );
            })}
          </span>
        ))}
      </h1>
      <h1 className={`title-portal__title title-portal__title--fallback ${showFallbackTitle ? 'is-visible' : ''}`} aria-hidden={!showFallbackTitle}>
        <span className="title-portal__line">{preset.titleLines[0]}</span>
        {preset.titleLines[1] ? <span className="title-portal__line">{preset.titleLines[1]}</span> : null}
      </h1>
      <p className={`title-portal__microcopy ${hideMicrocopy ? 'is-hidden' : ''}`}>{preset.microcopy}</p>
      <button className={`title-portal__cta ${hideCta ? 'is-hidden' : ''}`} onClick={onView}>
        View
      </button>
    </section>
  );
}
