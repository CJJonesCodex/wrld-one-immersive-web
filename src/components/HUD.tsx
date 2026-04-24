import type { QualityLevel } from '../systems/useQuality';

export interface ZoneInfo {
  id: string;
  title: string;
  description: string;
  lore: string;
  mediaSlot: string;
  futureAssetHint: string;
}

interface HUDProps {
  zone: ZoneInfo | null;
  onClose: () => void;
  quality: QualityLevel;
  setQuality: (level: QualityLevel) => void;
  progress: number;
}

const qualityLevels: QualityLevel[] = ['low', 'medium', 'high'];

export function HUD({ zone, onClose, quality, setQuality, progress }: HUDProps) {
  return (
    <>
      <header className="hud-top">
        <div>
          <p className="hud-label">WRLD ONE GATE</p>
          <p className="hud-sub">Scroll to travel • Touch/move to steer subtle parallax</p>
        </div>
        <div className="quality-switch" role="group" aria-label="quality">
          {qualityLevels.map((level) => (
            <button
              key={level}
              className={quality === level ? 'active' : ''}
              onClick={() => setQuality(level)}
              type="button"
            >
              {level}
            </button>
          ))}
        </div>
      </header>

      <aside className="hud-mini">
        <p>World Progress</p>
        <strong>{Math.round(progress * 100)}%</strong>
        <small>W/S or ↑/↓ nudges camera • ESC closes active panel</small>
      </aside>

      {zone ? (
        <>
          <button
            aria-label="Close details"
            className="hud-backdrop"
            type="button"
            onClick={onClose}
          />
          <section className="hud-panel" role="dialog" aria-label={`${zone.title} details`}>
            <button className="hud-close" onClick={onClose} type="button" aria-label="Close panel">
              ✕
            </button>
            <p className="hud-zone">{zone.id}</p>
            <h2>{zone.title}</h2>
            <p>{zone.description}</p>
            <p className="hud-meta"><strong>Lore:</strong> {zone.lore}</p>
            <p className="hud-meta"><strong>Media Slot:</strong> {zone.mediaSlot}</p>
            <p className="hud-meta"><strong>Asset Note:</strong> {zone.futureAssetHint}</p>
          </section>
        </>
      ) : null}
    </>
  );
}
