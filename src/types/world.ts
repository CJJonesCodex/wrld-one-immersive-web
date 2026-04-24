export type WorldId =
  | 'living-macro'
  | 'signal-garden'
  | 'core-chamber'
  | 'aurora-passage'
  | 'rift-bloom'
  | 'future-world';

export type WorldStatus = 'Prototype' | 'Concept' | 'Open';

export type WorldCategory =
  | 'Living Media Test'
  | 'Spatial System'
  | 'Engine Room'
  | 'Motion Study'
  | 'Portal Study'
  | 'Expansion Slot';

export type QualityLevel = 'low' | 'medium' | 'high';

export interface Vec3Tuple {
  0: number;
  1: number;
  2: number;
}

export interface FeaturedWorldMedia {
  poster?: string;
  mp4?: string;
  webm?: string;
  mediaSlotId: string;
  aspectRatio: number;
}

export interface FeaturedWorldColors {
  primary: string;
  secondary: string;
  accent: string;
  glassTint: string;
  atmosphereA: string;
  atmosphereB: string;
}

export interface FeaturedWorldScene {
  position: [number, number, number];
  rotation: [number, number, number];
  depthLayer: number;
  scrollTarget: number;
  focusRange: [number, number];
}

export interface FeaturedWorld {
  id: WorldId;
  index: number;
  indexLabel: string;
  title: string;
  shortTitle: string;
  categoryLabel: WorldCategory;
  statusLabel: WorldStatus;
  mood: string;
  sensoryCue: string;
  description: string;
  media: FeaturedWorldMedia;
  colors: FeaturedWorldColors;
  scene: FeaturedWorldScene;
}
