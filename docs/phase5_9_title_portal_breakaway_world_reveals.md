# Phase 5.9 — Title Portal Breakaway World Reveals

## Goal
- Make world titles behave as massive typographic monuments that transition into actual abstract worlds.
- Convert static title cards into scroll-controlled reveal moments.
- Principle: **Typography is the door. VFX is the unlocking motion. The world is revealed behind the broken title.**

## Transition architecture
For the active world only:
1. `pre`
2. `intro`
3. `hold`
4. `breakaway`
5. `revealed`
6. `exit`

Runtime signals include active world, local world progress, and per-phase progress fields.

## Per-world title breakaway choreography
- **Living Macro**: letters dissolve into dew droplets/spores.
- **Signal Garden**: letters slice into signal bands and pulse-line remnants.
- **Core Chamber**: letters collapse into halo rings/orbital glyph hints.
- **Aurora Passage**: letters smear into flowing chromatic ribbons.
- **Rift Bloom**: letters fold open like petals/aperture blades.
- **Future World**: letters deconstruct into blueprint lines and constellation points.

## Per-world revealed abstract world
- **Living Macro**: botanical dew field.
- **Signal Garden**: glass signal flora.
- **Core Chamber**: calm halo engine.
- **Aurora Passage**: chromatic ribbon corridor.
- **Rift Bloom**: portal flower aperture.
- **Future World**: open coordinate constellation field.

## Mobile-fit rules
- Reveal remains inside safe zones.
- Avoid title clipping.
- Avoid text/VFX collisions.
- Reduce density in particles and world objects.
- Show one world reveal at a time.
- Prefer line/word fragmentation over per-character splitting when needed.

## Performance rules
- Only one active reveal system runs at a time.
- Avoid hidden heavy VFX work.
- Keep title-vfx mode image/video-free for reveal scenes.
- Dispose of temporary geometry/material resources.
- `npm run build` must pass.
