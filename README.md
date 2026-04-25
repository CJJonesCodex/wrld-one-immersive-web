# WRLD ONE — Phase 5.9 Title Portal Breakaway World Reveals

## Phase 5.9 summary
Phase 5.9 upgrades the title-vfx experience from static title cards to **title portals**. Each active world title appears as a large readable monument first, then breaks apart via world-specific choreography to reveal a true abstract 3D world behind it.

## Title-as-portal concept
- Typography is the door.
- VFX is the unlocking motion.
- The revealed world is behind the broken title.

## Reveal runtime phases
1. `pre`
2. `intro`
3. `hold`
4. `breakaway`
5. `revealed`
6. `exit`

The runtime is scroll-driven and reversible. If users scroll backward, title fragments and world reveal values reverse smoothly.

## Per-world breakaway styles
1. Living Macro → dew dissolve.
2. Signal Garden → signal slice.
3. Core Chamber → halo collapse.
4. Aurora Passage → ribbon smear.
5. Rift Bloom → petal aperture.
6. Future World → constellation deconstruct.

## Per-world abstract reveal stages
1. Living Macro → botanical dew field.
2. Signal Garden → glass signal flora.
3. Core Chamber → calm halo engine.
4. Aurora Passage → chromatic ribbon corridor.
5. Rift Bloom → portal flower aperture.
6. Future World → coordinate constellation field.

## Mobile-fit safety
- One world reveal active at a time.
- Reduced density for particles/object counts.
- Title fragmentation can use safer chunking in mobile-fit.
- Title/CTA remain usable before breakaway.
- Avoid horizontal overflow.

## Reduced-motion behavior
- Dramatic shatter/scatter is softened.
- Breakaway uses fade/short slide behavior.
- World reveal fades in softly.
- Particle density is heavily reduced.

## Performance notes
- Keep Vite + React + TypeScript + R3F.
- Keep title-vfx mode and media-card fallback mode.
- Keep existing VFX preset systems.
- One active reveal system only.
- Dispose/avoid heavy hidden VFX work.
- `npm run build` must pass.

## Future upgrades
1. Replace abstract worlds with custom GLB environments.
2. Add filmed media reveals after title break.
3. Add depth-map reveal shaders.
4. Add GSAP timeline smoothing (if needed).
5. Strengthen sound-reactive reveals after performance testing.
