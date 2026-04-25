# WRLD ONE — Phase 5.12 Hard No-Blank Visibility Lock

## Phase 5.12 summary
Phase 5.12 applies a hard emergency visibility lock so post-hero scroll states always show obvious active-world content. The DOM/screen-space layer now takes priority whenever title readability softens.

## Why DOM visibility is now primary
The Three.js reveal remains the spatial depth layer, but WebGL variance can still produce low-visibility frames. Phase 5.12 temporarily prioritizes the fixed DOM/screen-space reveal so blank cream states are blocked first, then advanced WebGL reveal tuning can continue safely.

Layer model now:
1. Canvas (3D world + reveal)
2. Scene veil
3. Screen-space world reveal safety layer (DOM/CSS, primary continuity layer)
4. Hero/title portal typography (never fully disappears post-hero)
5. HUD/menu/drawer/detail UI

## Screen-space reveal safety layer
- `ScreenSpaceWorldReveal` reads active world, continuity state, reveal runtime, viewport mode, and overlay state.
- Hidden during hero.
- Post-hero opacity floor is hard-locked to a visible minimum.
- Breakaway/revealed/exit phases force strong reveal visibility.
- Overlay-aware attenuation reduces opacity under drawer/detail without fully zeroing it.
- A persistent world anchor label is shown after hero so active-world identity is always readable.
- Pointer-events disabled, fixed viewport coverage, and no horizontal overflow.

## Per-world screen-space reveal identities
Each world now has a distinct guaranteed-visible identity:
- **Living Macro**: organic dots + growth lines + drifting particles (green/gold).
- **Signal Garden**: diagonal signal lines + nodes + pulsing scan tone (blue).
- **Core Chamber**: concentric halo/ring field (violet/gold).
- **Aurora Passage**: sliding ribbon bands (coral/violet/rose).
- **Rift Bloom**: conic bloom with aperture masking.
- **Future World**: blueprint line grid + constellation particle field.

## No-blank acceptance rule
No non-hero state should visually collapse to blank cream background.
- Active title never fully disappears after hero.
- If title readability drops, reveal opacity is forced higher.
- Breakaway/revealed/exit phases keep reveal strongly visible.
- Dev warning logs any blank-risk state when title/reveal/screen-reveal all trend too low outside hero.

## Mobile Version toggle sanity
- Mobile/Cinematic toggle remains available.
- If standalone toggle is hidden on short screens, the toggle is shown in the mobile drawer.
- Drawer now labels the control as **Display Mode** for clarity and separation from content CTAs.

## QA checklist
- Open on phone.
- Scroll past Living Macro title.
- Confirm a visible green/gold macro reveal remains.
- Scroll to Signal Garden.
- Confirm blue signal reveal remains.
- Continue through all worlds.
- Confirm no blank cream screen appears after hero.
- Confirm Mobile Version toggle exists as standalone or in Menu.
- Confirm `npm run build` passes.

## Build
```bash
npm run build
```
