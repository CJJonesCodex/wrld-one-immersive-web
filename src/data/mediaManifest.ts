export type MediaSlotId = 'gate-loop' | 'corridor-loop' | 'core-loop' | 'rift-loop';

export interface MediaSlot {
  id: MediaSlotId;
  zoneId: string;
  title: string;
  description: string;
  mp4: string;
  webm: string;
  poster: string;
  aspectRatio: number;
}

export const mediaManifest: MediaSlot[] = [
  {
    id: 'gate-loop',
    zoneId: 'ZONE-01',
    title: 'Entry Gate Sync',
    description: 'Signal lock visuals for first contact at the gate ring.',
    mp4: '/media/gate-loop.mp4',
    webm: '/media/gate-loop.webm',
    poster: '/media/gate-poster.webp',
    aspectRatio: 16 / 9,
  },
  {
    id: 'corridor-loop',
    zoneId: 'ZONE-02',
    title: 'Corridor Telemetry',
    description: 'Directional glyph traffic flowing through panel arrays.',
    mp4: '/media/corridor-loop.mp4',
    webm: '/media/corridor-loop.webm',
    poster: '/media/corridor-poster.webp',
    aspectRatio: 16 / 9,
  },
  {
    id: 'core-loop',
    zoneId: 'ZONE-03',
    title: 'Living Macro Sample',
    description: 'A cinematic nature sample used to test video texture playback inside the Core Chamber.',
    mp4: '/media/core-loop.mp4',
    webm: '/media/core-loop.webm',
    poster: '/media/core-poster.webp',
    aspectRatio: 9 / 16,
  },
  {
    id: 'rift-loop',
    zoneId: 'ZONE-04',
    title: 'Rift Exit Distortion',
    description: 'Portal shell harmonics before transit to the next world.',
    mp4: '/media/rift-loop.mp4',
    webm: '/media/rift-loop.webm',
    poster: '/media/rift-poster.webp',
    aspectRatio: 16 / 9,
  },
];

export const mediaByZoneId = mediaManifest.reduce<Record<string, MediaSlot>>((acc, slot) => {
  acc[slot.zoneId] = slot;
  return acc;
}, {});
