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
  gradientA: string;
  gradientB: string;
  worldPosition: [number, number, number];
  rotation: [number, number, number];
  depthLayer: number;
  mood: string;
  sensoryCue: string;
}

export const featuredWorlds: FeaturedWorld[] = [
  {
    id: 'living-macro-sample',
    indexLabel: '01',
    title: 'Living Macro Sample',
    shortDescription: 'The first real living-media capsule, preserving the snail/fiddlehead core test in a premium bright frame.',
    categoryLabel: 'Living Media Test',
    statusLabel: 'Prototype',
    mediaSlotId: 'core-loop',
    poster: '/media/core-poster.webp',
    mp4: '/media/core-loop.mp4',
    webm: '/media/core-loop.webm',
    aspectRatio: 9 / 16,
    colorAccent: '#7fd8b2',
    gradientA: '#e8ffd2',
    gradientB: '#7bf0d4',
    worldPosition: [0, 1.95, -36],
    rotation: [0, 0.09, 0],
    depthLayer: 1,
    mood: 'quiet wonder',
    sensoryCue: 'soft forest shimmer',
  },
  {
    id: 'signal-garden',
    indexLabel: '02',
    title: 'Signal Garden',
    shortDescription: 'A floating telemetry meadow where signal petals pulse across warm sky-to-aqua gradients.',
    categoryLabel: 'Spatial Signal Study',
    statusLabel: 'In Progress',
    mediaSlotId: 'signal-garden-slot',
    poster: '/media/signal-garden-poster.webp',
    mp4: '/media/signal-garden-loop.mp4',
    webm: '/media/signal-garden-loop.webm',
    aspectRatio: 16 / 9,
    colorAccent: '#76c9ff',
    gradientA: '#ffe0be',
    gradientB: '#82d7ff',
    worldPosition: [1.45, 2.2, -67],
    rotation: [0, -0.17, 0],
    depthLayer: 2,
    mood: 'clear uplift',
    sensoryCue: 'crystal pulse breeze',
  },
  {
    id: 'core-chamber',
    indexLabel: '03',
    title: 'Core Chamber',
    shortDescription: 'Validation chamber for media-slot reliability with botanical lighting and pearl-gold reflections.',
    categoryLabel: 'Core Chamber Test',
    statusLabel: 'Live',
    mediaSlotId: 'core-chamber-slot',
    poster: '/media/core-poster.webp',
    mp4: '/media/core-loop.mp4',
    webm: '/media/core-loop.webm',
    aspectRatio: 9 / 16,
    colorAccent: '#ffd38a',
    gradientA: '#fff1d6',
    gradientB: '#ffc78f',
    worldPosition: [-1.7, 2.35, -98],
    rotation: [0, 0.2, 0],
    depthLayer: 3,
    mood: 'botanical calm',
    sensoryCue: 'dew sparkle hush',
  },
  {
    id: 'aurora-passage',
    indexLabel: '04',
    title: 'Aurora Passage',
    shortDescription: 'A curved color corridor where luminous ribbons guide a gentle transition deeper into space.',
    categoryLabel: 'Color Transit',
    statusLabel: 'Concept Build',
    mediaSlotId: 'aurora-passage-slot',
    poster: '/media/aurora-passage-poster.webp',
    mp4: '/media/aurora-passage-loop.mp4',
    webm: '/media/aurora-passage-loop.webm',
    aspectRatio: 21 / 9,
    colorAccent: '#b99cff',
    gradientA: '#f9d4ff',
    gradientB: '#9ec5ff',
    worldPosition: [0.9, 2.08, -132],
    rotation: [0, -0.08, 0],
    depthLayer: 4,
    mood: 'cinematic glide',
    sensoryCue: 'ribbon bloom tone',
  },
  {
    id: 'rift-bloom',
    indexLabel: '05',
    title: 'Rift Bloom',
    shortDescription: 'An optimistic finale portal where coral-violet energy opens into the next era of featured worlds.',
    categoryLabel: 'Finale Portal',
    statusLabel: 'Previsualization',
    mediaSlotId: 'rift-bloom-slot',
    poster: '/media/rift-bloom-poster.webp',
    mp4: '/media/rift-bloom-loop.mp4',
    webm: '/media/rift-bloom-loop.webm',
    aspectRatio: 16 / 10,
    colorAccent: '#ff8eb8',
    gradientA: '#ffd6cc',
    gradientB: '#ff9fe5',
    worldPosition: [-1.25, 2.3, -167],
    rotation: [0, 0.11, 0],
    depthLayer: 5,
    mood: 'joyful arrival',
    sensoryCue: 'warm portal chorus',
  },
  {
    id: 'future-world-slot',
    indexLabel: '06',
    title: 'Future World Slot',
    shortDescription: 'Reserved capsule for the next filmed world drop, prelit with hopeful pearl and sunrise tones.',
    categoryLabel: 'Reserved Slot',
    statusLabel: 'Future',
    mediaSlotId: 'future-world-slot',
    poster: '/media/future-world-slot-poster.webp',
    aspectRatio: 16 / 9,
    colorAccent: '#80ddb0',
    gradientA: '#fef8de',
    gradientB: '#bceecf',
    worldPosition: [0.4, 2.18, -202],
    rotation: [0, -0.04, 0],
    depthLayer: 6,
    mood: 'open horizon',
    sensoryCue: 'gentle sunrise swell',
  },
];
