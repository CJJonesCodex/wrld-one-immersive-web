# WRLD ONE — Phase 4 Bright PRMO-Level Spatial Experience System

WRLD ONE is a Vite + React + TypeScript + Three.js / React Three Fiber immersive website. Phase 4 evolves the prototype into a brighter, optimistic, premium spatial gallery while preserving the existing Core Chamber snail media benchmark.

## Phase 4 Summary

- Shifted visual identity from dark/minimal to bright cinematic gradients, pearl glass UI, and optimistic color atmospherics.
- Implemented a 6-world **Featured Worlds** system with numbered index and spatial rail behavior.
- Upgraded card language to premium luminous glass capsules with subtle motion, labels, and view affordances.
- Added sensory micro-systems (Sound / Haptic / 3D Sensor), custom cursor intent states, and micro audio visualizer.
- Preserved and elevated the snail media test as world `01` and world `03` continuity anchor.

## PRMO-Inspired Interaction Principles (Original WRLD ONE Adaptation)

- Featured Works becomes **Featured Worlds** with numbered discoverability.
- Scroll is a cinematic camera journey through real 3D space.
- Scrollbar acts as a spatial timeline navigator with tap/click world jumps.
- Sensory controls stay explicit opt-in and lightweight.
- Motion stays premium and calm with damping, depth haze, and subtle drift.
- Identity remains original WRLD ONE (no PRMO copy/brand/assets/code).

## Bright WRLD ONE Visual Direction

- Bright
- Happy
- Premium
- Clean
- Futuristic
- Cinematic
- Luminous
- Optimistic
- Spatial

## Featured Worlds System

Data source: `src/data/featuredWorlds.ts`

World set:

1. Living Macro Sample
2. Signal Garden
3. Core Chamber
4. Aurora Passage
5. Rift Bloom
6. Future World Slot

Each world includes:

- `id`, `indexLabel`, `title`, `shortDescription`
- `categoryLabel`, `statusLabel`, `mediaSlotId`
- `poster`, optional `mp4` / `webm`
- `aspectRatio`, `colorAccent`, `gradientA`, `gradientB`
- `worldPosition`, `rotation`, `depthLayer`
- `mood`, `sensoryCue`

## ScrollbarNav

File: `src/components/ScrollbarNav.tsx`

- Thin progress rail + per-world ticks.
- Tick tap/click snaps toward world index.
- Styled as a non-blocking bright spatial timeline.

## SensoryControls

File: `src/components/SensoryControls.tsx`

- Sound OFF/ON (never autoplayed)
- Haptic OFF/ON (safe fallback if unsupported)
- 3D Sensor OFF/ON (permission requested only after user action)

Supporting systems:

- `src/systems/useAmbientSound.ts`
- `src/systems/useHaptics.ts`
- `src/systems/useDeviceSensor.ts`

## RecoloredCursor

File: `src/components/RecoloredCursor.tsx`

- Desktop-only minimal ring/dot cursor.
- Hidden on touch devices and reduced-motion preference.
- Reacts to interactive targets using `data-cursor="interactive"`.

## AudioVisualizer

File: `src/components/AudioVisualizer.tsx`

- Visible only when sound is enabled.
- Small analyser-based micro bars in soft bright tones.

## Media Upload Locations

Store media in `public/media/`.

Current required assets:

- `/media/core-poster.webp`
- `/media/core-loop.mp4`
- `/media/core-loop.webm`

Optional additional world media can be added with matching paths in `featuredWorlds.ts`.

If a media file is missing, cards fallback to poster and then procedural placeholder material (no crash).

## How to Add a New Featured World

1. Add a world entry in `src/data/featuredWorlds.ts`.
2. Assign `indexLabel` and transform values (`worldPosition`, `rotation`, `depthLayer`).
3. Point `poster` and optional `mp4/webm` to `public/media` paths.
4. Provide color fields (`colorAccent`, `gradientA`, `gradientB`) and narrative fields (`mood`, `sensoryCue`).
5. Validate scroll + index + scrollbar navigation.

## Old-School Motion (No AI Video Dependency)

- Ken Burns-like active card drift/scale.
- Light sweep pass over active media surfaces.
- Procedural fallback shading for missing media.
- Floating depth mist and layered dust/sparkle particles.
- Gentle pointer/sensor parallax blended into camera and card feel.

## Phone QA Checklist

- [ ] Experience clearly reads as 3D spatial web at first glance.
- [ ] Scroll/touch exploration reveals worlds smoothly.
- [ ] Featured index collapses cleanly on mobile.
- [ ] Scrollbar ticks are tappable.
- [ ] Sensory controls are legible and usable.
- [ ] Sound remains opt-in only.
- [ ] Sensor denied/unsupported path degrades gracefully.
- [ ] Snail media sample remains visible and stable.
- [ ] Frame pacing remains smooth on iPhone/Android.

## Vercel Deployment Checklist

- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] `public/media` assets included
- [ ] Preview URL validated on desktop and phone
- [ ] Production deployment verified after QA

## Performance Checklist

- [ ] DPR clamped per quality mode.
- [ ] Low quality: posters/fallbacks only, fewer particles, no video textures.
- [ ] Medium quality: limited active-neighbor video textures.
- [ ] High quality: stronger atmosphere while still limiting simultaneous video textures.
- [ ] Inactive media pauses and resources are cleaned up.
- [ ] Effects/listeners are cleaned up (audio, sensor, scroll loops).

## Next Upgrade Path

1. Real filmed video loops for each world.
2. Image-sequence scroll playback.
3. GLB architectural models.
4. Compressed textures/transcoding pipeline.
5. Restrained postprocessing (subtle bloom/vignette).
6. Case-study detail panel transitions.
7. Project-specific sound design.
8. Brighter branded WRLD ONE design system.

## Local Development

```bash
npm install
npm run dev
npm run build
npm run preview
```
