export type ScenePhase = 'hero' | 'intro' | 'rail' | 'focus' | 'bloom';

export interface ScenePhaseState {
  phase: ScenePhase;
  showHero: boolean;
  showWorldUI: boolean;
  showFeaturedIndex: boolean;
  showActiveReadout: boolean;
  showCardLabels: boolean;
  showCardViewButtons: boolean;
  showScrollbarNav: boolean;
  showMobileBottomUI: boolean;
}

export function getScenePhase(progress: number, isMobile = false): ScenePhaseState {
  if (progress < 0.16) {
    return {
      phase: 'hero',
      showHero: true,
      showWorldUI: false,
      showFeaturedIndex: false,
      showActiveReadout: false,
      showCardLabels: false,
      showCardViewButtons: false,
      showScrollbarNav: false,
      showMobileBottomUI: false,
    };
  }

  if (progress < 0.24) {
    return {
      phase: 'intro',
      showHero: false,
      showWorldUI: true,
      showFeaturedIndex: !isMobile,
      showActiveReadout: true,
      showCardLabels: false,
      showCardViewButtons: false,
      showScrollbarNav: true,
      showMobileBottomUI: true,
    };
  }

  if (progress < 0.72) {
    return {
      phase: 'rail',
      showHero: false,
      showWorldUI: true,
      showFeaturedIndex: !isMobile,
      showActiveReadout: true,
      showCardLabels: true,
      showCardViewButtons: true,
      showScrollbarNav: true,
      showMobileBottomUI: true,
    };
  }

  if (progress < 0.88) {
    return {
      phase: 'focus',
      showHero: false,
      showWorldUI: true,
      showFeaturedIndex: !isMobile,
      showActiveReadout: true,
      showCardLabels: true,
      showCardViewButtons: true,
      showScrollbarNav: true,
      showMobileBottomUI: true,
    };
  }

  return {
    phase: 'bloom',
    showHero: false,
    showWorldUI: true,
    showFeaturedIndex: !isMobile,
    showActiveReadout: true,
    showCardLabels: false,
    showCardViewButtons: false,
    showScrollbarNav: true,
    showMobileBottomUI: true,
  };
}
