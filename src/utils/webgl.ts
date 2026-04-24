function tryContext(
  canvas: HTMLCanvasElement,
  contextName: 'webgl2' | 'webgl' | 'experimental-webgl',
): boolean {
  try {
    const context = canvas.getContext(contextName, {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
    } as WebGLContextAttributes);
    return Boolean(context);
  } catch {
    return false;
  }
}

export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  const canvas = document.createElement('canvas');
  return (
    tryContext(canvas, 'webgl2') ||
    tryContext(canvas, 'webgl') ||
    tryContext(canvas, 'experimental-webgl')
  );
}
