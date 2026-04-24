import { useEffect } from 'react';
import type { FeaturedWorld } from '../types/world';

interface WorldDetailPanelProps {
  world: FeaturedWorld | null;
  onClose: () => void;
}

export function WorldDetailPanel({ world, onClose }: WorldDetailPanelProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!world) return null;
  return (
    <>
      <button className="mobile-backdrop" onClick={onClose} aria-label="Close detail panel" />
      <aside className="detail-panel is-open" role="dialog" aria-modal="true">
        <button onClick={onClose} aria-label="Close detail panel">Close</button>
        <p>{world.indexLabel} · {world.categoryLabel}</p>
        <h3>{world.title}</h3>
        <p>{world.statusLabel} · {world.mood}</p>
        <p>{world.sensoryCue}</p>
        <p>{world.description}</p>
        <p>Media Slot: {world.media.mediaSlotId}</p>
      </aside>
    </>
  );
}
