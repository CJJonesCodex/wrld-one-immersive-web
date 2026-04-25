# WRLD ONE — Phase 5.10 Blank-State Rescue + Mobile Toggle

## Phase 5.10 summary
Phase 5.10 is a stabilization pass on the title portal pipeline. The core goal is simple: **no blank visual states** between hero, title, breakaway, and revealed world.

## Blank-state rescue
- Added an explicit visual continuity contract so post-hero states always keep either title or reveal visible.
- Added a non-negotiable guard that prevents title disappearance until reveal visibility is strong enough.
- Continuity now wins over runtime phase mismatch to avoid cream-background dead zones.

## Mobile Version toggle
- Added a persistent mode switch:
  - `MOBILE VERSION` when in cinematic mode.
  - `CINEMATIC VERSION` when in mobile-fit mode.
- Preference is saved in `localStorage` under `wrld-one-viewport-mode`.
- Default behavior:
  - phone widths (`<= 820px`) default to mobile-fit.
  - wider viewports default to cinematic.

## Visual continuity state
- Introduced `getVisualContinuityState` for title/reveal/particles visibility and opacity.
- Uses scene phase + reveal runtime to ensure smooth transitions:
  - hero
  - intro/hold
  - breakaway
  - revealed
  - exit
  - dead-zone fallback

## Non-negotiable no-blank invariant
```ts
// NON-NEGOTIABLE: the title cannot disappear until the active world reveal is visible.
// This prevents blank cream-background states during scroll transitions.
```

Enforced outcomes:
- no non-hero state where both title and reveal are hidden;
- title hidden only when reveal is visible enough;
- compact fallback title appears when reveal visibility is uncertain.

## Active-world-relative reveal timing
- Reveal timing now derives from each active world's `focusRange` (with local padding) rather than only absolute preset windows.
- Runtime phases remain scroll-derived and reversible for backward scroll reconstruction.

## WorldRevealStage visibility rules
- World reveal renders for active world in title-vfx mode outside hero.
- Opacity is continuity-driven.
- Revealed/exit phases hold strong reveal visibility.
- Mobile-fit reduces density/scale while keeping at least one clear major shape per world.

## Mobile-fit discovery rules
- Standalone top-right toggle is shown when viewport height is `>= 720px` or on desktop.
- On shorter phone viewports (`< 720px`), toggle is shown inside the mobile drawer near the top.

## QA checklist
- Open site on phone.
- Confirm Mobile Version toggle is visible or inside menu.
- Scroll from Living Macro forward.
- Confirm title does not disappear into blank.
- Confirm world reveal remains visible.
- Confirm breakaway particles appear.
- Scroll backward and confirm title returns.
- Test all six worlds.
- Confirm npm run build passes.

## Build
```bash
npm run build
```
