# WRLD ONE — Phase 5.10 Blank-State Rescue + Mobile Toggle

## Phase 5.10 summary
Phase 5.10 stabilizes the title-portal reveal pipeline and adds a real Mobile Version / Cinematic Version viewport toggle. The core fix is simple and strict: **the active title cannot disappear unless the active world reveal is already visible.**

## Non-negotiable no-blank invariant
No title may disappear unless the active `WorldRevealStage` is visible at a readable opacity.

Implementation rules:

- After hero, either the active title or the active world reveal must be visible.
- If the title portal is hidden, reveal opacity must be at least `0.75`.
- If reveal visibility cannot be guaranteed, the title remains visible in compact mode.
- This prevents blank cream-background states while scrolling between title breakaway and world reveal.

## Mobile Version toggle
The app now supports two viewport modes:

- `cinematic` — larger expressive layout.
- `mobile-fit` — phone-safe composition for titles, reveal worlds, nav, and menu controls.

The selection is stored with:

`wrld-one-viewport-mode`

Phone-width viewports default to `mobile-fit` unless the user has already chosen another mode.

## Visual continuity state
The new visual continuity layer controls:

- hero visibility
- title portal visibility
- break particle visibility
- revealed world visibility
- title opacity
- reveal opacity
- particle opacity

This layer is the safety guard that stops the title and reveal from both disappearing.

## Active-world-relative reveal timing
Reveal timing is now based on each active world's `focusRange` instead of relying only on absolute global timing windows. Each active world gets a reversible scroll-driven cycle:

1. title intro
2. title hold
3. breakaway
4. revealed world
5. exit

Scrolling backward reconstructs or softens the reveal rather than leaving an empty state.

## WorldRevealStage visibility rules
The revealed world stage remains rendered when title-vfx mode is active, except during hero. After breakaway, world reveal opacity is kept readable, and every world has a clear abstract structure:

1. Living Macro → botanical stems, dew orbs, green/gold motes.
2. Signal Garden → signal lines, pulse nodes, scan sweep.
3. Core Chamber → core sphere, halo rings, orbital points.
4. Aurora Passage → wide chromatic ribbons.
5. Rift Bloom → petal aperture portal.
6. Future World → constellation dots and connecting lines.

## Mobile-fit discovery rules
On normal phone heights, the viewport toggle can appear as a standalone button. On shorter phone heights, the toggle is available inside the Menu drawer to avoid top-right clutter.

## QA checklist

- Open the site on phone.
- Confirm Mobile Version / Cinematic Version toggle is visible or available inside Menu.
- Scroll from Living Macro forward.
- Confirm the title never disappears into blank background.
- Confirm the revealed world remains visible after title breakaway.
- Confirm break particles appear during breakaway.
- Scroll backward and confirm the title returns or reconstructs.
- Test all six worlds.
- Confirm no horizontal overflow.
- Confirm `npm run build` passes.

## Future upgrades
1. Strengthen the revealed worlds with custom GLB environments.
2. Add filmed media reveals after title break.
3. Add depth-map reveal shaders.
4. Add GSAP timeline smoothing if needed.
5. Strengthen sound-reactive reveal intensity after performance testing.
