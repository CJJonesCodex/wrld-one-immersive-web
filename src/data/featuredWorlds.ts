import type { FeaturedWorld, WorldId } from '../types/world';

export type { FeaturedWorld } from '../types/world';

export const featuredWorlds: FeaturedWorld[] = [
  {
    id: 'living-macro',
    index: 1,
    indexLabel: '01',
    title: 'Living Macro Sample',
    shortTitle: 'Macro',
    categoryLabel: 'Living Media Test',
    statusLabel: 'Prototype',
    mood: 'Quiet Wonder',
    sensoryCue: 'Soft forest shimmer',
    description: 'A soft botanical media capsule testing living-world footage inside the spatial gallery.',
    media: { poster: '/media/core-poster.webp', mp4: '/media/core-loop.mp4', webm: '/media/core-loop.webm', mediaSlotId: 'core-loop', aspectRatio: 9 / 16 },
    colors: { primary: '#7cffb2', secondary: '#ffd166', accent: '#56d987', glassTint: '#ecfff4', atmosphereA: '#eafbea', atmosphereB: '#fff8ec' },
    scene: { position: [-1.7, 0.75, -2.2], rotation: [0, 0.28, 0], depthLayer: 1, scrollTarget: 0.28, focusRange: [0.22, 0.36] },
  },
  {
    id: 'signal-garden', index: 2, indexLabel: '02', title: 'Signal Garden', shortTitle: 'Signal', categoryLabel: 'Spatial System', statusLabel: 'Concept', mood: 'Clean Signal', sensoryCue: 'Sky glass pulses',
    description: 'A luminous data garden where interface signals behave like floating glass flora.', media: { mediaSlotId: 'signal-garden', aspectRatio: 4 / 5 },
    colors: { primary: '#54d8ff', secondary: '#fffdf7', accent: '#74e4ff', glassTint: '#effbff', atmosphereA: '#dff7ff', atmosphereB: '#fffdf7' },
    scene: { position: [1.65, 0.25, -4.3], rotation: [0, -0.22, 0], depthLayer: 2, scrollTarget: 0.4, focusRange: [0.34, 0.48] },
  },
  {
    id: 'core-chamber', index: 3, indexLabel: '03', title: 'Core Chamber', shortTitle: 'Core', categoryLabel: 'Engine Room', statusLabel: 'Prototype', mood: 'Calm Intelligence', sensoryCue: 'Lavender resonance',
    description: 'A central chamber for future world-state, media routing, and immersive scene logic.', media: { mediaSlotId: 'core-chamber', aspectRatio: 16 / 10 },
    colors: { primary: '#a78bfa', secondary: '#ffd166', accent: '#bba7ff', glassTint: '#f7f2ff', atmosphereA: '#f6e9ff', atmosphereB: '#fff8ec' },
    scene: { position: [-1.25, -0.05, -6.4], rotation: [0, 0.18, 0], depthLayer: 3, scrollTarget: 0.54, focusRange: [0.48, 0.62] },
  },
  {
    id: 'aurora-passage', index: 4, indexLabel: '04', title: 'Aurora Passage', shortTitle: 'Aurora', categoryLabel: 'Motion Study', statusLabel: 'Concept', mood: 'Soft Acceleration', sensoryCue: 'Ribbon light drift',
    description: 'A color-ribbon corridor for testing scroll motion, parallax, and atmospheric transitions.', media: { mediaSlotId: 'aurora-passage', aspectRatio: 4 / 5 },
    colors: { primary: '#ff7a66', secondary: '#a78bfa', accent: '#ffb4c8', glassTint: '#fff1f3', atmosphereA: '#ffe7dc', atmosphereB: '#f6e9ff' },
    scene: { position: [1.75, 0.7, -8.3], rotation: [0, -0.24, 0], depthLayer: 4, scrollTarget: 0.68, focusRange: [0.62, 0.76] },
  },
  {
    id: 'rift-bloom', index: 5, indexLabel: '05', title: 'Rift Bloom', shortTitle: 'Bloom', categoryLabel: 'Portal Study', statusLabel: 'Concept', mood: 'Optimistic Arrival', sensoryCue: 'Pearl aperture bloom',
    description: 'A bright final portal that turns navigation into a blooming spatial transition.', media: { mediaSlotId: 'rift-bloom', aspectRatio: 1 },
    colors: { primary: '#ffd166', secondary: '#54d8ff', accent: '#ffe39c', glassTint: '#fff9df', atmosphereA: '#fff8ec', atmosphereB: '#dff7ff' },
    scene: { position: [-1.55, 0.3, -10.2], rotation: [0, 0.22, 0], depthLayer: 5, scrollTarget: 0.82, focusRange: [0.76, 0.88] },
  },
  {
    id: 'future-world', index: 6, indexLabel: '06', title: 'Future World Slot', shortTitle: 'Future', categoryLabel: 'Expansion Slot', statusLabel: 'Open', mood: 'Invitation', sensoryCue: 'Open canvas air',
    description: 'An open capsule reserved for the next filmed loop, GLB world, or case-study scene.', media: { mediaSlotId: 'future-world', aspectRatio: 16 / 9 },
    colors: { primary: '#fffdf7', secondary: '#7cffb2', accent: '#f7fff7', glassTint: '#ffffff', atmosphereA: '#fffdf7', atmosphereB: '#eafbea' },
    scene: { position: [0.3, 0.95, -12.4], rotation: [0, -0.08, 0], depthLayer: 6, scrollTarget: 0.94, focusRange: [0.88, 1] },
  },
];

export const getWorldById = (id: WorldId): FeaturedWorld | undefined => featuredWorlds.find((world) => world.id === id);

export const getWorldByIndex = (index: number): FeaturedWorld | undefined => featuredWorlds.find((world) => world.index === index);
