import type { FeaturedWorld } from '../data/featuredWorlds';
import type { QualityLevel } from '../systems/useQuality';

interface HUDProps {
  activeWorld: FeaturedWorld;
  panelWorld: FeaturedWorld | null;
  progress: number;
  quality: QualityLevel;
  setQuality: (level: QualityLevel) => void;
  onClosePanel: () => void;
}

const qualityLevels: QualityLevel[] = ['low', 'medium', 'high'];

export function HUD({ activeWorld, panelWorld, progress, quality, setQuality, onClosePanel }: HUDProps) {
  return (
    <>
      <header className="hud-top">
        <div>
          <p className="hud-label">WRLD ONE</p>
          <p className="hud-sub">{activeWorld.indexLabel} · {activeWorld.title}</p>
        </div>
        <div className="quality-switch" role="group" aria-label="Rendering quality">
          {qualityLevels.map((level) => (
            <button key={level} className={level === quality ? 'active' : ''} type="button" onClick={() => setQuality(level)}>
              {level}
            </button>
          ))}
        </div>
      </header>

      <aside className="hud-mini">
        <p>Scroll to explore featured projects</p>
        <strong>{Math.round(progress * 100)}%</strong>
        <small>ESC closes details</small>
      </aside>

      {panelWorld ? (
        <>
          <button type="button" className="hud-backdrop" aria-label="Close panel" onClick={onClosePanel} />
          <section className="hud-panel" role="dialog" aria-label={`${panelWorld.title} details`}>
            <button className="hud-close" onClick={onClosePanel} type="button" aria-label="Close panel">
              ✕
            </button>
            <p className="hud-zone">{panelWorld.indexLabel}</p>
            <h2>{panelWorld.title}</h2>
            <p>{panelWorld.shortDescription}</p>
            <p className="hud-meta"><strong>Category:</strong> {panelWorld.categoryLabel}</p>
            <p className="hud-meta"><strong>Status:</strong> {panelWorld.statusLabel}</p>
            <p className="hud-meta"><strong>Media Slot:</strong> {panelWorld.mediaSlotId}</p>
          </section>
        </>
      ) : null}
    </>
  );
}
