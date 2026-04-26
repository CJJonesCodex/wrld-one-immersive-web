import type { WorldId } from '../types/world';

export function scrollToWorldSection(worldId: WorldId): void {
  if (typeof document === 'undefined') return;
  const section = document.querySelector<HTMLElement>(`[data-world-id="${worldId}"]`);
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
