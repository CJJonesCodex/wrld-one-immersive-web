# Phase 5.4/5.5 Spatial Surgery + No-Clutter Composition Audit

## 1) PRMO structural interaction principles (reference-only)
- Small global navigation with low-ink framing.
- Featured Works index with numbered entry rows.
- Sensory toggles (sound/haptic/sensor-like controls) grouped as compact top controls.
- Scroll-to-explore cue as a behavioral onboarding anchor.
- 3D slider/per-section progression feeling rather than long-form page stacking.
- Custom cursor and ambient audio visualizer as secondary feedback layers.
- Scrollbar-as-navigation relationship (ticks + progress).
- Strong hierarchy with controlled negative space and one dominant text layer at a time.

## 2) Current WRLD ONE build issues before this pass
- Fake/custom section feel still influenced layout decisions despite progress-based scroll APIs.
- Page shell had mixed fixed/full-height patterns that caused cluttered simultaneous overlays.
- World composition read as over-extended tunnel depth instead of compressed gallery.
- Camera movement felt too traversal-heavy with layered UI collisions.
- Multiple UI systems were readable together (hero + card labels + index + readout + buttons).
- Card visuals still had overly legible inactive states.
- Mobile drawer/readout/list states could overlap, reducing compositional clarity.
- Visibility rules were distributed across components rather than centrally phase-controlled.

## 3) Exact implementation plan executed
1. Replace interaction shell with true scroll-space architecture (fixed canvas + fixed HUD + native document scroll).
2. Use real `scrollY` progress (`useScrollProgress`) and central `scrollToProgress` navigation.
3. Add `useScenePhase` to define visibility gates per phase (`hero`, `intro`, `rail`, `focus`, `bloom`).
4. Rework active-world targeting to nearest `scene.scrollTarget` with focus-range stability.
5. Keep compressed world coordinates in the z `-2` to `-13` gallery range.
6. Keep composed camera path with restrained FOV/parallax and damped movement.
7. Enforce `FeaturedWorldRail` as the single visible card/media system in `World`.
8. Keep featured-world data typed around `world.media`, `world.colors`, `world.scene`.
9. Rebuild `PremiumGlassCard` as thin layered planes, active-only labels, active-only View affordance.
10. Consolidate media loading in `useMediaTexture` with safe video/poster/procedural fallback lifecycle.
11. Rebuild global CSS to tokenized, low-clutter HUD/card/readability rules.
12. Enforce mobile drawer closed-by-default and scene-veil dimming for hero/drawer/detail focus.
13. Update README and validate with `npm run build`.
