import type { QualityLevel } from '../systems/useQuality';

export interface ZoneInfo {
  id: string;
  title: string;
  description: string;
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
          <p className="hud-sub">Scroll through the world • Move pointer for parallax</p>
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
        <small>W/S or ↑/↓ adjusts camera • ESC closes panel</small>
      </aside>

      {zone ? (
        <section className="hud-panel" role="dialog" aria-label={`${zone.title} details`}>
          <button className="hud-close" onClick={onClose} type="button" aria-label="Close panel">
            ✕
          </button>
          <p className="hud-zone">{zone.id}</p>
          <h2>{zone.title}</h2>
          <p>{zone.description}</p>
        </section>
      ) : null}
    </>
  );
}
