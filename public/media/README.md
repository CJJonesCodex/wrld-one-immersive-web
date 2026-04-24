# WRLD ONE Media Upload Folder

Drop cinematic assets in this directory to populate 3D media planes.

## Supported slots and file names

- `gate-loop.mp4`
- `gate-loop.webm`
- `gate-poster.webp`
- `corridor-loop.mp4`
- `corridor-loop.webm`
- `corridor-poster.webp`
- `core-loop.mp4`
- `core-loop.webm`
- `core-poster.webp`
- `rift-loop.mp4`
- `rift-loop.webm`
- `rift-poster.webp`

## Behavior if files are missing

The app will not crash. Each zone falls back to an animated procedural placeholder panel when media files are unavailable.

## Video recommendations

- Resolution: 1280x720 or 1920x1080 max
- Codec: H.264 for `.mp4`, VP9 for `.webm`
- Target bitrate: 3-8 Mbps for mobile-friendly streaming
- Duration: 4-12s seamless loops
- Keep files lightweight for Vercel bandwidth and mobile startup speed
