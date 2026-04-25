# WRLD ONE — Phase 5.11 Screen-Space Reveal Safety Layer

## Phase 5.11 summary
Phase 5.11 adds a **screen-space reveal safety layer** so post-hero scroll states always present a visible world identity in the viewport, even when the WebGL reveal is faint, off-camera, or visually subtle on real phones.

## Why a CSS/DOM reveal fallback exists
The Three.js reveal remains the spatial depth layer, but phone rendering variance can still produce low-visibility frames. The new DOM layer is fixed in screen space and continuity-driven so blank cream states cannot occur when title opacity drops.

Layer model now:
1. Canvas (3D world + reveal)
2. Scene veil
3. Screen-space world reveal safety layer (DOM/CSS)
4. Hero/title portal typography
5. HUD/menu/drawer/detail UI

## Screen-space reveal safety layer
- Added `ScreenSpaceWorldReveal` that reads active world, continuity state, reveal runtime, viewport mode, and overlay state.
- Hidden during hero.
- Continuity and phase-aware opacity floor rules force visible reveal when title is fading/hidden.
- Overlay-aware attenuation reduces opacity under drawer/detail without fully zeroing it.
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
- If title opacity is very low, screen-space reveal opacity is floored.
- If title mode is hidden or reveal phase is revealed/exit, screen-space reveal is strongly visible.
- Dev warning logs a blank-risk state when title/reveal/screen-reveal all trend to zero outside hero.

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
