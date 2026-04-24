# WRLD ONE — Phase 5.3 Spatial Interface

## Phase 5.3 summary
This phase rebuilds WRLD ONE into a bright cinematic spatial gallery system: fixed fullscreen WebGL canvas, scroll-driven camera journey, featured-world rail, responsive HUD, and sensory controls.

## PRMO-caliber interaction translation
PRMO is used as interaction-quality reference only. WRLD ONE implementation is original in data model, copy, layout, visual language, and 3D composition.

## Art direction
**WRLD ONE is a luminous spatial gallery where featured worlds float through soft atmospheric light like living cinematic artifacts.**

## Exact color system
- Background: `#fff8ec`, `#f6e9ff`, `#dff7ff`, `#eafbea`
- Ink: `#17131f`, `#09070d`
- Accents: `#ffd166`, `#ff7a66`, `#54d8ff`, `#a78bfa`, `#7cffb2`, `#fffdf7`, `#ffb4c8`

## Scroll map
- `0.00–0.10`: entry
- `0.10–0.20`: worlds intro
- `0.20–0.72`: world rail
- `0.72–0.84`: core focus
- `0.84–0.94`: rift transition
- `0.94–1.00`: final bloom

## Camera path
Camera uses authored control points from near-front entry to deep bloom portal, with damped interpolation and limited pointer/sensor parallax.

## FeaturedWorld data model
Typed model includes IDs, status/category enums, media config, color tokens, and per-world scene composition metadata.

## PremiumGlassCard anatomy
- Backing glass plate
- Soft media plane (video/poster/procedural fallback)
- Thin border/hairline behavior
- Top-left index/title label
- Lower-right View affordance
- Expanded invisible hit area

## Media lifecycle and fallback
`useMediaTexture` centralizes media logic:
- optional video (webm/mp4) when quality allows
- poster fallback
- procedural fallback when no media slot is available
- cleanup for texture/video resources

## Sensor / sound / haptic behavior
- Sound: user-triggered ambient oscillator bed only.
- Haptic: optional navigator.vibrate pulse no-op fallback.
- Sensor: optional DeviceOrientation permission flow with safe disable path.

## Quality modes
- **Low**: DPR 1, poster-only, minimal particles/orbs/ribbons.
- **Medium**: DPR 1.5, one active video texture.
- **High**: DPR 2, up to two active/near-active videos.

## Mobile QA checklist
- Open on iPhone.
- No horizontal overflow.
- Scroll reaches all worlds.
- Bottom nav/ticks visible.
- Menu opens drawer.
- Drawer closes on outside tap.
- Sound starts only after tap.
- Audio visualizer appears only when sound is on.
- Haptic does not error if unsupported.
- 3D Sensor permission flow does not break.
- Snail card is readable and not stretched.
- No giant OPEN pill.
- No cyan side bars.
- Detail panel opens and closes.
- Vercel build succeeds.

## Vercel deployment checklist
- `npm run build` passes.
- No TS strict errors.
- Static assets in `/public/media` resolve.
- Environment settings unchanged from current Vercel project.

## Performance checklist
- Fixed full-canvas render shell.
- Quality-aware particle/orb/ribbon counts.
- Limited concurrent video textures.
- Event listener cleanup on unmount.
- Reduced-motion support for animation minimization.

## Known future upgrades
1. Add professionally filmed video loops.
2. Replace procedural placeholders with real posters/video.
3. Add GLB architectural objects per world.
4. Compress GLB models with Draco.
5. Compress textures with KTX2/Basis.
6. Add image-sequence transitions for scroll moments.
7. Refine camera motion with GSAP timelines.
8. Build full case-study detail views.
9. Create a dedicated WRLD ONE logo and typography system.
10. Add project-specific sound design.
