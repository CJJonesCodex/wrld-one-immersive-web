# WRLD ONE GATE — Phase 2 Cinematic Spatial Media Upgrade

This project is a full-screen immersive 3D web experience built with Vite + React + TypeScript + Three.js via React Three Fiber. The Phase 1 foundation remains intact while Phase 2 upgrades camera choreography, layered architecture, media surfaces, hotspot storytelling, and mobile-first polish.

## Phase 2 Summary

- Cinematic scroll camera path with damped interpolation across 4 narrative zones.
- Layered depth/scale architecture (foreground portal rings, corridor ribs, silhouettes, grid bridge, distant portal frame, energy cable lines).
- New media manifest + 3D media plane system with safe video loading and fallback placeholders.
- Upgraded hotspots and HUD narrative payload per zone.
- Quality-aware behavior for DPR, particles, glow intensity, and video enablement.
- Mobile touch parallax and HUD interaction polish.

## 3D Media System

### Files

- Manifest: `src/data/mediaManifest.ts`
- Renderer: `src/scenes/MediaPlanes.tsx`
- Upload guide: `public/media/README.md`

### How it works

1. `mediaManifest` defines four optional media slots (`gate-loop`, `corridor-loop`, `core-loop`, `rift-loop`).
2. `MediaPlanes` creates floating cinematic planes in matching world zones.
3. It attempts `.webm` first, then `.mp4`, then poster texture.
4. If no media assets exist (or loading fails), it uses animated procedural placeholder materials.
5. Video playback is muted + looped + inline and defers to user interaction if autoplay is blocked.

## Uploading Videos/Images via GitHub + Vercel

1. Add files to `public/media/` with exact names below.
2. Commit and push to GitHub.
3. Vercel deploy will include files automatically.
4. Visit deployed URL and test each zone hotspot/media plane.

### Required / Recommended file names

- `/media/gate-loop.mp4`
- `/media/gate-loop.webm`
- `/media/gate-poster.webp`
- `/media/corridor-loop.mp4`
- `/media/corridor-loop.webm`
- `/media/corridor-poster.webp`
- `/media/core-loop.mp4`
- `/media/core-loop.webm`
- `/media/core-poster.webp`
- `/media/rift-loop.mp4`
- `/media/rift-loop.webm`
- `/media/rift-poster.webp`

### Recommended video sizes (Vercel + mobile)

- Preferred resolution: `1280x720`
- Maximum practical resolution: `1920x1080`
- Duration: `4-12s` seamless loops
- Bitrate target: `3-8 Mbps`
- Keep each file as small as practical for fast startup and reduced mobile thermal load

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Manual QA Checklist (Phone-focused)

- [ ] Canvas is full-screen and no horizontal scroll appears.
- [ ] Scroll feels smooth and progresses through Entry Gate → Signal Corridor → Core Chamber → Rift Exit.
- [ ] Touch drag creates subtle camera parallax.
- [ ] Hotspots are easy to tap and open a compact HUD panel.
- [ ] Tap outside panel (backdrop) closes HUD on mobile.
- [ ] `Esc` closes HUD on desktop.
- [ ] Quality selector changes particle density + visual intensity.
- [ ] Missing media files show animated placeholders, not broken textures.
- [ ] If videos are uploaded, planes display looping footage and remain muted inline.
- [ ] `npm run build` succeeds.

## Vercel Deployment Checklist

- [ ] Repo connected to Vercel project.
- [ ] Build command: `npm run build`.
- [ ] Output directory: `dist`.
- [ ] Media files committed under `public/media/`.
- [ ] Deploy preview verified on desktop + phone.
- [ ] Production redeploy after QA pass.

## Next Upgrade Path

1. Replace primitives with optimized GLB models.
2. Add compressed textures and asset atlases.
3. Add cinematic high-quality video loops for each zone.
4. Add real portal transitions between world states.
5. Add spatial audio + optional haptics later.
