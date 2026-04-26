import { useEffect, useState } from 'react';
import type { WorldId } from '../types/world';
import { clamp01 } from '../utils/math';

const WORLD_IDS: WorldId[] = [
  'living-macro',
  'signal-garden',
  'core-chamber',
  'aurora-passage',
  'rift-bloom',
  'future-world',
];

export interface SectionActiveWorldState {
  activeWorldId: WorldId;
  activeIndex: number;
  sectionProgress: number;
}

const DEFAULT_STATE: SectionActiveWorldState = {
  activeWorldId: 'living-macro',
  activeIndex: 0,
  sectionProgress: 0,
};

function isWorldId(value: string): value is WorldId {
  return WORLD_IDS.includes(value as WorldId);
}

function getWorldSections(): HTMLElement[] {
  if (typeof document === 'undefined') return [];

  return Array.from(document.querySelectorAll<HTMLElement>('.world-scroll-section')).filter((section) => {
    const { worldId } = section.dataset;
    return typeof worldId === 'string' && isWorldId(worldId);
  });
}

function getSectionStateFromDom(sections: HTMLElement[]): SectionActiveWorldState {
  if (typeof window === 'undefined' || sections.length === 0) return DEFAULT_STATE;
  const viewportCenter = window.innerHeight / 2;

  let closestSection = sections[0];
  let closestDistance = Number.POSITIVE_INFINITY;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestSection = section;
    }
  }

  const worldId = closestSection.dataset.worldId;
  const activeWorldId = worldId && isWorldId(worldId) ? worldId : 'living-macro';
  const activeIndex = Math.max(0, WORLD_IDS.indexOf(activeWorldId));
  const rect = closestSection.getBoundingClientRect();
  const sectionProgress = rect.height > 0 ? clamp01((viewportCenter - rect.top) / rect.height) : 0;

  return {
    activeWorldId,
    activeIndex,
    sectionProgress,
  };
}

export function useSectionActiveWorld(): SectionActiveWorldState {
  const [state, setState] = useState<SectionActiveWorldState>(DEFAULT_STATE);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const sections = getWorldSections();
    let raf = 0;

    const measure = () => {
      raf = 0;
      setState(getSectionStateFromDom(sections));
    };

    const scheduleMeasure = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(measure);
    };

    scheduleMeasure();

    const observer =
      typeof window.IntersectionObserver !== 'undefined'
        ? new window.IntersectionObserver(() => {
            scheduleMeasure();
          }, { threshold: [0, 0.25, 0.5, 0.75, 1] })
        : null;

    if (observer) {
      sections.forEach((section) => observer.observe(section));
    }

    window.addEventListener('scroll', scheduleMeasure, { passive: true });
    window.addEventListener('resize', scheduleMeasure);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener('scroll', scheduleMeasure);
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, []);

  return state;
}
