import { useMemo } from 'react';
import { featuredWorlds } from '../data/featuredWorlds';

export function useActiveWorld(activeIndex: number) {
  return useMemo(() => featuredWorlds[activeIndex] ?? featuredWorlds[0], [activeIndex]);
}
