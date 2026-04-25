# Phase 5.10 — Blank-State Rescue + Mobile Toggle

## Goal
Phase 5.10 stabilizes the title-portal reveal pipeline so the site never scrolls into an empty cream-background state. It also adds a real viewport composition mode toggle so phone users can switch between the cinematic layout and a mobile-fit layout.

## Non-negotiable invariant
The active title cannot disappear until the active world reveal is visible.

In code terms:

- If the hero is hidden, either the title portal or the world reveal must be visible.
- If the title portal is hidden, reveal opacity must be at least `0.75`.
- If continuity cannot prove the reveal is visible, the title stays visible in compact mode.

## New viewport mode system
`useViewportMode` controls:

- `cinematic`
- `mobile-fit`

The selected mode is persisted with localStorage key:

`wrld-one-viewport-mode`

Phone-width viewports default to `mobile-fit` unless the user has chosen a different mode.

## Visual continuity system
`visualContinuity.ts` is the central display guard. It decides when to show:

- hero
- title portal
- break particles
- world reveal

It prevents dead zones between title breakaway and world reveal.

## Active-world-relative reveal timing
`useWorldRevealRuntime` now derives reveal timing from the active world's `focusRange` rather than relying on absolute global timing windows. This lets every active world complete a readable cycle:

1. title intro
2. title hold
3. breakaway
4. revealed world
5. exit

## Mobile-fit behavior
Mobile-fit adds a safer composition class and tighter title sizing so the title and reveal remain on screen. On short mobile screens, the mode toggle appears inside the menu drawer instead of adding more top-right clutter.

## QA checklist

- Open on phone.
- Confirm Mobile Version / Cinematic Version toggle is visible or available inside Menu.
- Scroll from Living Macro forward.
- Confirm the title never disappears into a blank background.
- Confirm the revealed world remains visible after title breakaway.
- Confirm break particles appear during breakaway.
- Scroll backward and confirm the title returns.
- Test all six worlds.
- Confirm no horizontal overflow.
- Confirm `npm run build` passes.
