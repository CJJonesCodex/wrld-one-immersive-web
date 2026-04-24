# WRLD ONE — Phase 3 PRM-Level Spatial Interface System

WRLD ONE is a Vite + React + TypeScript + Three.js / React Three Fiber immersive web system. Phase 3 upgrades the prototype into a premium black spatial interface language inspired by high-end interaction patterns (without copying any external brand assets, copy, or layouts).

## Phase 3 Summary

- Added a cinematic **Featured Worlds** data model and numbered project rail.
- Added PRM-style interaction primitives: sensory controls, scroll timeline nav, featured index, custom cursor, and micro audio visualizer.
- Reworked 3D card language into monochrome premium glass cards with restrained accents.
- Preserved the **Core Chamber snail media test** while removing chunky bright-blue prototype styling.
- Kept mobile-first performance controls and stable Vercel deployment flow.

## PRM-Inspired Interaction Principles (Original WRLD ONE Interpretation)

- Scroll is spatial navigation, not page content reveal.
- Works are discoverable as a numbered editorial index.
- Cards exist in real 3D depth and fog, not flat DOM sections.
- Sensory toggles are explicit opt-in (sound, haptic, sensor).
- Motion is calm, cinematic, and damped.
- Visual language is near-black, soft white, thin borders, and restrained cyan only for tiny details.

## Featured Worlds System

Data source: `src/data/featuredWorlds.ts`

Each world entry includes:

- `id`, `indexLabel`, `title`, `shortDescription`
- `categoryLabel`, `statusLabel`, `mediaSlotId`
- `poster`, optional `mp4` / `webm`
- `aspectRatio`, `colorAccent`
- `worldPosition`, `rotation`, `depthLayer`

### Current worlds

1. Living Macro Sample
2. Signal Architecture
3. Core Chamber
4. Rift Exit
5. Future World Slot

## ScrollbarNav

File: `src/components/ScrollbarNav.tsx`

- Thin vertical timeline UI with ticks per world.
- Fill amount reflects current scroll progress.
- Tick click/tap navigates to the linked world.
- Designed to stay lightweight and non-blocking for the scene.

## SensoryControls

File: `src/components/SensoryControls.tsx`

- Sound OFF/ON
- Haptic OFF/ON
- 3D Sensor OFF/ON

Supporting systems:

- `src/systems/useAmbientSound.ts` (Web Audio ambient hum, opt-in only)
- `src/systems/useHaptics.ts` (`navigator.vibrate` safe fallback)
- `src/systems/useDeviceSensor.ts` (permission-gated orientation control)

## RecoloredCursor

File: `src/components/RecoloredCursor.tsx`

- Desktop-only cursor ring/dot overlay.
- Hidden on touch devices and reduced-motion preference.
- Minimal rendering overhead and no heavy filters.

## AudioVisualizer

File: `src/components/AudioVisualizer.tsx`

- Shown only when sound is enabled.
- Uses analyser frequency bins for subtle micro-bars.
- Quiet monochrome styling to match HUD language.

## Media Upload Locations

Place assets under `public/media/`.

Current expected paths include:

- `/media/core-poster.webp`
- `/media/core-loop.mp4`
- `/media/core-loop.webm`
- plus optional slots for corridor/rift/future assets.

If a file is missing, the system falls back to procedural placeholder rendering instead of crashing.

## Add a New Featured World

1. Add an entry in `src/data/featuredWorlds.ts`.
2. Provide world transform values (`worldPosition`, `rotation`, `depthLayer`).
3. Add media paths (poster required, video optional).
4. Ensure index label ordering remains sequential.
5. Test navigation through FeaturedWorksIndex + ScrollbarNav + scroll path.

## Old-School Motion Without AI Video

The experience intentionally uses classic motion craft:

- Ken Burns-like media drift and scale emphasis.
- Slow light sweep overlays on active cards.
- Procedural fallback surfaces for missing media.
- Depth mist planes and layered dust particles.
- Gentle parallax from pointer/touch/sensor blend.

## Phone QA Checklist

- [ ] iPhone/Android loads full-screen with no layout overflow.
- [ ] Scroll progression feels smooth and non-jittery.
- [ ] Featured index can collapse/expand on mobile.
- [ ] Scrollbar ticks are tappable.
- [ ] Sensory controls are readable and tappable.
- [ ] No forced sound playback.
- [ ] Sensor toggle failure is graceful if permission denied.
- [ ] Core Chamber media still appears or cleanly falls back.
- [ ] Build remains stable and responsive thermally.

## Vercel Deployment Checklist

- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] `public/media` assets committed
- [ ] Preview deploy validated on desktop + phone
- [ ] Production deploy verified after QA

## Performance Checklist

- [ ] DPR is clamped by quality profile.
- [ ] Low mode uses posters/fallbacks and fewer particles.
- [ ] Video textures are limited to active/nearby cards.
- [ ] Inactive media is paused/cleaned up.
- [ ] No memory leaks from audio/sensor listeners.

## Next Upgrade Path

1. Real filmed video loops for each world.
2. Image-sequence scroll playback for hero worlds.
3. GLB architectural models with LOD.
4. Compressed textures + optimized transcoding.
5. Restrained postprocessing (subtle bloom/vignette only).
6. Case-study detail transitions between rail and panel.
7. Project-specific sound design layers.

## Local Development

```bash
npm install
npm run dev
npm run build
npm run preview
```
