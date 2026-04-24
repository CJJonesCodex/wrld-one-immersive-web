# WRLD ONE GATE — Immersive 3D Website Prototype

A production-style prototype for **WRLD ONE BUILD** built as a full-screen, scroll-driven 3D browser experience.

Instead of a flat 2D landing page, this app renders a cinematic dark sci-fi world where users move through spatial zones:

1. Entry Gate
2. Signal Corridor
3. Core Chamber
4. Rift Exit

## Stack

- Vite
- React + TypeScript
- Three.js via `@react-three/fiber`
- `@react-three/drei`
- GSAP (installed and ready for timeline choreography)
- Lenis (installed and ready for alternate smooth-scroll orchestration)

## Features Included

- Full-screen WebGL canvas
- Scroll-controlled forward movement through 3D space
- Pointer/touch parallax camera response
- 4 unique zones composed with primitive geometry (rings, panels, nodes, grid, particles, rift)
- Clickable 3D hotspots that open HUD information panels
- Loading screen UI
- WebGL fallback message
- Mobile-friendly responsive HUD
- Keyboard controls:
  - `W/S` or `↑/↓` = nudge camera
  - `Esc` = close HUD panel
- Quality selector (`Low`, `Medium`, `High`)
- DPR clamp for performance

## Local Development

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (typically `http://localhost:5173`).

## Production Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

### Option A: Vercel dashboard

1. Push this repository to GitHub.
2. In Vercel, click **Add New Project**.
3. Import the repo.
4. Framework preset: **Vite** (usually auto-detected).
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy.

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```


## Sandbox Build Verification Note

Codex could not fully verify `npm install` and `npm run build` in this sandbox because the environment returned `403 Forbidden` from `registry.npmjs.org` while resolving packages.

In a normal npm-enabled environment, run:

```bash
npm install
npm run build
```

## Manual QA Checklist (No screenshots)

Use this checklist locally after dependencies install successfully:

- [ ] Launch with `npm run dev` and confirm full-screen 3D canvas renders (not a flat sectioned page).
- [ ] Scroll down/up and verify camera traverses forward/backward through all four zones.
- [ ] Move mouse/finger and verify subtle parallax response in camera framing.
- [ ] Click/tap each hotspot and confirm the HUD panel opens with correct zone info.
- [ ] Press `Esc` and confirm the HUD panel closes.
- [ ] Press `W/S` and `↑/↓` on desktop to verify camera nudge controls.
- [ ] Switch quality Low/Medium/High and confirm visual/performance changes (DPR + particle density).
- [ ] Confirm loading overlay appears during initialization and dismisses when world is ready.
- [ ] Disable hardware acceleration / test incompatible browser and confirm WebGL fallback message appears.
- [ ] On mobile viewport, verify HUD remains usable and scene interaction remains smooth.
- [ ] Run `npm run build` and `npm run preview`; verify production build serves correctly.

## Replacing primitives with GLB models later

Current zones use procedural meshes so the prototype is lightweight and self-contained.

To upgrade visuals with production assets:

1. Export optimized `.glb` files from Blender/C4D.
2. Compress with Draco + meshopt (where appropriate).
3. Place assets in `public/models/`.
4. Replace primitive groups in `src/scenes/ZoneObjects.tsx` with `useGLTF('/models/asset.glb')`.
5. Keep hotspot anchors and camera path logic unchanged so interaction behavior remains consistent.
6. Add baked emissive textures and light probes for improved performance on mobile.

## Roadmap (next evolution)

To move toward the feel of Chrono Threads, Rose Island, Spline/Webflow 3D sites, Luma-style interactive scenes, and PRM-like immersion:

1. **Narrative Motion Direction**
   - GSAP timeline choreography for zone transitions, reveals, and cinematic camera beats.
2. **Asset Pipeline**
   - Hero environment kits, animated gates, VFX sprites, volumetric fog cards, shader-driven portals.
3. **Interaction Layer**
   - Branching hotspot flows, guided missions, stateful progression, and diegetic UI prompts.
4. **Visual Fidelity**
   - Post-processing stack (bloom, DOF, chromatic aberration), material layering, animated decals.
5. **Performance Discipline**
   - Dynamic quality autoscaling, geometry instancing, texture atlas pipeline, frame budgeting by device tier.
6. **Authoring & CMS Bridge (future)**
   - Optional content schema for zone copy and event scripting to support iterative story publishing.

---

This foundation is intentionally implementation-ready for local development and direct deployment to Vercel.
