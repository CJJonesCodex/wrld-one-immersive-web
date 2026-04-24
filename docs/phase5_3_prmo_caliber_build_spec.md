# Phase 5.3 — PRMO-Caliber Spatial Interface Build Spec

## Observed PRMO interaction structure
- Global navigation with lightweight fixed hierarchy.
- Featured Works list with numbered entries and active-state continuity.
- Always-available Sound, Haptic, and 3D Sensor state controls.
- Scroll-to-explore cue and sectional narrative continuity.
- 3D slider feeling and per-section spatial composition shifts.
- Custom cursor behavior with contextual expansion over interactives.
- Tiny audio visualizer for ambient-state feedback.
- Scrollbar-to-navigation behavior through tick markers.
- Reduced interface clutter, strong hierarchy, and strong negative space.

## WRLD ONE translation
- Featured Works → **Featured Worlds**.
- Project entries → **spatial world capsules**.
- 3D slider → **floating world-card rail**.
- Scrollbar navigation → **spatial progress navigation**.
- Sound/Haptic/3D Sensor → **WRLD ONE sensory controls**.
- Custom cursor → **active-world energy cursor**.
- Audio visualizer → **subtle living-system indicator**.
- Dark restraint → **bright, optimistic, luminous world-gallery system**.

## Current-site problems to solve
- Card frames feel heavy.
- UI feels bolted on.
- Color system lacks art-direction discipline.
- Extra geometry reads as demo clutter.
- Camera path does not always compose active card correctly.
- HUD hierarchy is fragmented.
- Mobile layout can crowd controls.
- Media panels need stronger art-object framing.
- Sensory controls should feel integrated.

## Implementation plan
### Files to change
- `src/App.tsx`
- `src/styles/global.css`
- `README.md`
- All required systems/components/scenes listed in the task.

### New files
- `docs/phase5_3_prmo_caliber_build_spec.md`
- `src/types/world.ts`
- `src/constants/designTokens.ts`
- `src/constants/scrollMap.ts`
- `src/utils/math.ts`
- `src/utils/media.ts`
- `src/systems/useReducedMotion.ts`
- `src/components/HeroOverlay.tsx`
- `src/components/ActiveWorldReadout.tsx`
- `src/components/WorldDetailPanel.tsx`
- `src/components/MobileDrawer.tsx`
- `src/scenes/ThinRibbons.tsx`
- `src/scenes/RiftBloom.tsx`
- `src/scenes/useMediaTexture.ts`

### Expected state flow
1. Scroll updates `progress` via RAF-throttled `useScrollProgress`.
2. `useActiveWorld(progress)` resolves world focus.
3. Camera, HUD, index, tick nav, readout, and card rail consume same active world.
4. Sensory controls mutate sound/haptic/sensor local states.
5. Detail panel opens from card or navigation selection.

### Scroll progress map
- entry: 0.00–0.10
- worldsIntro: 0.10–0.20
- worldRail: 0.20–0.72
- coreFocus: 0.72–0.84
- riftTransition: 0.84–0.94
- finalBloom: 0.94–1.00

### Visual cleanup steps
- Remove heavy cyan framing and oversized OPEN treatment.
- Shift to thin off-white/accent hairlines.
- Keep card as hero object with glass backing and spatial breathing room.
- Keep atmospheric support subtle (mist/orbs/ribbons) and non-cluttered.

### Build verification
- Run `npm run build`.
- Resolve strict TypeScript errors.
- Confirm scroll navigation, sensory control safety, mobile drawer behavior.
