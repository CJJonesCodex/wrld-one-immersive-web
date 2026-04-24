# WRLD ONE — Phase 5.4/5.5 Spatial Surgery

## Phase 5.4/5.5 summary
This pass converts the prototype into a single-focus spatial gallery composition: native document scroll-space, a compressed camera/gallery scale, one primary card/media rail, and phase-gated visibility so only the right UI layer is readable at each moment.

## Why scroll-space changed
The app now uses real page scroll (`scrollY` against document height) with a fixed canvas/HUD shell and a dedicated `scroll-space` element (`700vh` desktop / `760vh` mobile). This removes fake scroll behavior and improves iPhone-native interaction.

## Camera and gallery scale explanation
The camera now follows authored keyframes with damped interpolation and restrained FOV/parallax. World card positions are compressed to approximately `z -2` through `z -13` so the scene reads as a curated gallery, not a deep tunnel.

## Duplicate visual system cleanup
`FeaturedWorldRail` is the single visible card/media system. Legacy competing systems (separate visible media panels/hotspots) are not part of live scene rendering in this phase.

## Scene phase system
`getScenePhase(progress)` centralizes visibility:
- `hero`
- `intro`
- `rail`
- `focus`
- `bloom`

These phases control hero/index/readout/scrollbar/card-label/view-button visibility and prevent overlap collisions.

## Text budget rule
A central visibility pass enforces readable-layer limits:
- Hero: brand + menu + hero copy
- Mobile rail/focus: brand + menu + readout + one View
- Drawer open mobile: brand + drawer only
- Detail open: detail panel takes priority, competing overlays are hidden

## Active-only card labels
Card labels and View affordances render only on the active card and only when phase + active-strength thresholds allow it. Near/far cards stay quiet silhouettes.

## Mobile drawer visibility rule
Drawer is closed by default and is the only location for the full Featured Worlds list on mobile. Opening drawer suppresses competing readout/card-label layers.

## Hero/card collision fix
Hero phase suppresses card labels, View buttons, index, and readout while adding a soft hero veil for legibility.

## FeaturedWorld data model
World data is strongly typed and grouped by concern:
- `world.media`
- `world.colors`
- `world.scene` (position/rotation/scroll target/focus range)

## PremiumGlassCard anatomy
Each card is rebuilt as thin layers:
- soft backing plane
- media plane
- subtle border strips
- optional active sweep
- active-only HTML label + View affordance
- enlarged invisible hit area

## Media texture lifecycle
`useMediaTexture` handles:
- video (when quality/state allows)
- poster fallback
- procedural fallback
- pause/dispose cleanup for inactive/unmounted media

## Mobile QA checklist
- [ ] No horizontal overflow.
- [ ] Hero first-load shows no index/readout/card labels/View buttons.
- [ ] Bottom readout appears after hero.
- [ ] Mobile drawer opens only on tap and closes via backdrop.
- [ ] Featured Worlds list appears only inside drawer on mobile.
- [ ] Active card is the only card with readable View affordance.
- [ ] Sound visualizer appears only when sound is enabled.

## Vercel deployment checklist
- [ ] `npm run build` passes.
- [ ] No TypeScript errors.
- [ ] App remains Vite + React + TypeScript + R3F.
- [ ] Existing Vercel setup unchanged.

## Next recommended upgrades
1. Professionally filmed loops.
2. Real GLB objects per world.
3. Scroll image-sequence transitions.
4. GSAP timeline polish.
5. Full case-study detail pages.
