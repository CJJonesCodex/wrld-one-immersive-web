# WRLD ONE — Phase 5.6 Text Monument VFX Worlds

## Phase 5.6 summary
Phase 5.6 introduces a switchable visual architecture where the default presentation is now **text-first**: one huge active world title monument plus one procedural VFX identity per world. Media cards are retained as a fallback mode and are not deleted.

## Visual modes
- `title-vfx` (default): giant active title + procedural VFX hero.
- `media-cards`: restores picture/media-card-first presentation.

Switch mode in:
- `src/config/visualMode.ts`

```ts
export const DEFAULT_VISUAL_MODE: VisualMode = 'title-vfx';
```

## World VFX presets
1. Living Macro → organic dew shimmer.
2. Signal Garden → signal lines + node pulses.
3. Core Chamber → concentric halo system.
4. Aurora Passage → ribbon refraction field.
5. Rift Bloom → petal aperture bloom.
6. Future World → constellation blueprint field.

## No-clutter scene behavior
- Hero phase keeps only site hero messaging.
- Title monument starts after hero threshold.
- One active title only.
- One View CTA only.
- Drawer/detail states dim or hide title stage.
- In title-vfx mode, media cards remain subdued silhouettes.

## Performance notes
- One active VFX component only.
- Quality levels control particle/line/ring/ribbon counts.
- No hidden videos in `title-vfx` mode.
- No post-processing dependency added.

## Mobile QA checklist
- [ ] Menu remains readable and unobstructed.
- [ ] Title does not overflow horizontally.
- [ ] Exactly one active title and one View CTA.
- [ ] Drawer open suppresses title readability.
- [ ] Detail panel takes visual priority.
- [ ] Build passes with no TypeScript errors.

## Vercel deployment checklist
- [ ] `npm run build` passes.
- [ ] App remains Vite + React + TypeScript + R3F.
- [ ] Existing Vercel setup unchanged.

## Future upgrades
1. Add professionally filmed loops back into `media-cards` mode.
2. Add custom GLB objects per text VFX world.
3. Refine title transitions with GSAP if desired.
4. Add sound-reactive VFX intensity.
5. Add case-study detail panels for each world.
