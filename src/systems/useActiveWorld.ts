import { useEffect, useMemo, useRef, useState } from 'react';
import { featuredWorlds } from '../data/featuredWorlds';
import type { FeaturedWorld } from '../types/world';

function closestWorld(progress: number): FeaturedWorld {
  return featuredWorlds.reduce((closest, world) => {
    const closestDistance = Math.abs(progress - closest.scene.scrollTarget);
    const distance = Math.abs(progress - world.scene.scrollTarget);
    return distance < closestDistance ? world : closest;
  }, featuredWorlds[0]);
}

export function getActiveWorld(progress: number): FeaturedWorld {
  if (progress <= 0.22) {
    return featuredWorlds[0];
  }
  return closestWorld(progress);
}

export function useActiveWorld(progress: number): FeaturedWorld {
  const [activeId, setActiveId] = useState(featuredWorlds[0].id);
  const currentWorld = useMemo(() => featuredWorlds.find((w) => w.id === activeId) ?? featuredWorlds[0], [activeId]);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
    if (progress <= 0.22) {
      setActiveId(featuredWorlds[0].id);
      return;
    }

    const insideCurrent = progress >= currentWorld.scene.focusRange[0] && progress <= currentWorld.scene.focusRange[1];
    if (insideCurrent) return;

    const next = closestWorld(progress);
    if (next.id !== activeId) {
      setActiveId(next.id);
    }
  }, [activeId, currentWorld.scene.focusRange, progress]);

  return useMemo(() => featuredWorlds.find((w) => w.id === activeId) ?? getActiveWorld(progressRef.current), [activeId]);
}
