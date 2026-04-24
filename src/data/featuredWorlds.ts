export interface FeaturedWorld {
  id: string;
  indexLabel: string;
  title: string;
  shortDescription: string;
  categoryLabel: string;
  statusLabel: string;
  mediaSlotId: string;
  poster: string;
  mp4?: string;
  webm?: string;
  aspectRatio: number;
  colorAccent: string;
  worldPosition: [number, number, number];
  rotation: [number, number, number];
  depthLayer: number;
}

export const featuredWorlds: FeaturedWorld[] = [
  {
    id: 'living-macro-sample',
    indexLabel: '01',
    title: 'Living Macro Sample',
    shortDescription: 'Vertical living-media specimen inside a restrained black-glass housing.',
    categoryLabel: 'Living Media Test',
    statusLabel: 'Prototype',
    mediaSlotId: 'core-loop',
    poster: '/media/core-poster.webp',
    mp4: '/media/core-loop.mp4',
    webm: '/media/core-loop.webm',
    aspectRatio: 9 / 16,
    colorAccent: '#81b7d7',
    worldPosition: [0, 1.9, -36],
    rotation: [0, 0.05, 0],
    depthLayer: 1,
  },
  {
    id: 'signal-architecture',
    indexLabel: '02',
    title: 'Signal Architecture',
    shortDescription: 'Soft-edged telemetry corridors and monochrome structural studies.',
    categoryLabel: 'Spatial Study',
    statusLabel: 'In Development',
    mediaSlotId: 'signal-architecture',
    poster: '/media/corridor-poster.webp',
    mp4: '/media/corridor-loop.mp4',
    webm: '/media/corridor-loop.webm',
    aspectRatio: 16 / 9,
    colorAccent: '#94a0bf',
    worldPosition: [1.8, 2.2, -68],
    rotation: [0, -0.2, 0],
    depthLayer: 2,
  },
  {
    id: 'core-chamber',
    indexLabel: '03',
    title: 'Core Chamber',
    shortDescription: 'Quiet validation chamber preserving the snail media playback benchmark.',
    categoryLabel: 'Core Chamber Test',
    statusLabel: 'Live',
    mediaSlotId: 'core-chamber',
    poster: '/media/core-poster.webp',
    aspectRatio: 9 / 16,
    colorAccent: '#b0bacf',
    worldPosition: [-1.9, 2.45, -102],
    rotation: [0, 0.24, 0],
    depthLayer: 3,
  },
  {
    id: 'rift-exit',
    indexLabel: '04',
    title: 'Rift Exit',
    shortDescription: 'Final portal silhouette drifting beyond the featured rail.',
    categoryLabel: 'Transit Frame',
    statusLabel: 'Concept',
    mediaSlotId: 'rift-exit',
    poster: '/media/rift-poster.webp',
    mp4: '/media/rift-loop.mp4',
    webm: '/media/rift-loop.webm',
    aspectRatio: 16 / 9,
    colorAccent: '#9099a8',
    worldPosition: [0.3, 2.1, -140],
    rotation: [0, -0.06, 0],
    depthLayer: 4,
  },
  {
    id: 'future-world-slot',
    indexLabel: '05',
    title: 'Future World Slot',
    shortDescription: 'Reserved case-study anchor for the next premium world release.',
    categoryLabel: 'Reserved Slot',
    statusLabel: 'Future',
    mediaSlotId: 'future-world-slot',
    poster: '/media/future-world-poster.webp',
    aspectRatio: 16 / 10,
    colorAccent: '#7f8aa2',
    worldPosition: [-1.2, 2.3, -176],
    rotation: [0, 0.16, 0],
    depthLayer: 5,
  },
];
