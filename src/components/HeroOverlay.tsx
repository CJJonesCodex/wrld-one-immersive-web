import { mapRange } from '../utils/math';

interface HeroOverlayProps {
  progress: number;
  showHero: boolean;
}

export function HeroOverlay({ progress, showHero }: HeroOverlayProps) {
  const opacity = progress <= 0.06 ? 1 : Math.max(0, 1 - (progress - 0.06) / 0.1);
  const y = mapRange(Math.min(progress, 0.16), 0, 0.16, 0, -24);
  if (!showHero && opacity <= 0.01) return null;

  return (
    <>
      <div className="hero-veil" style={{ opacity }} />
      <section className={`hero-overlay ${opacity < 0.05 ? 'is-hidden' : ''}`} style={{ opacity, transform: `translate3d(0, ${y}px, 0)` }}>
        <p>WRLD ONE / SPATIAL WORKS</p>
        <h1>Worlds that move with you.</h1>
        <p>
          Scroll through living media capsules, signal gardens, and luminous portals built as one continuous spatial
          interface.
        </p>
        <small>Scroll to explore featured worlds.</small>
      </section>
    </>
  );
}
