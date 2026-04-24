import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type { FeaturedWorldMedia, QualityLevel } from '../types/world';

interface UseMediaTextureArgs {
  media: FeaturedWorldMedia;
  allowVideo: boolean;
  isActive: boolean;
  isNearActive: boolean;
  quality: QualityLevel;
}

interface UseMediaTextureResult {
  texture: THREE.Texture | null;
  mode: 'video' | 'poster' | 'procedural';
  ready: boolean;
  error: string | null;
}

export function useMediaTexture({ media, allowVideo, isActive, isNearActive, quality }: UseMediaTextureArgs): UseMediaTextureResult {
  const [result, setResult] = useState<UseMediaTextureResult>({ texture: null, mode: 'procedural', ready: false, error: null });
  const loader = useMemo(() => new THREE.TextureLoader(), []);
  const currentTexture = useRef<THREE.Texture | null>(null);

  useEffect(() => {
    let disposed = false;
    let videoElement: HTMLVideoElement | null = null;
    let videoTexture: THREE.VideoTexture | null = null;

    const clearTexture = () => {
      currentTexture.current?.dispose();
      currentTexture.current = null;
    };

    const loadPoster = () => {
      if (!media.poster) {
        setResult({ texture: null, mode: 'procedural', ready: true, error: null });
        return;
      }

      loader.load(
        media.poster,
        (texture) => {
          if (disposed) {
            texture.dispose();
            return;
          }
          clearTexture();
          texture.colorSpace = THREE.SRGBColorSpace;
          currentTexture.current = texture;
          setResult({ texture, mode: 'poster', ready: true, error: null });
        },
        undefined,
        () => setResult({ texture: null, mode: 'procedural', ready: true, error: 'poster-load-failed' }),
      );
    };

    const canUseVideo =
      allowVideo &&
      quality !== 'low' &&
      (isActive || (quality === 'high' && isNearActive)) &&
      Boolean(media.webm || media.mp4);

    if (canUseVideo) {
      videoElement = document.createElement('video');
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.playsInline = true;
      videoElement.preload = 'metadata';
      videoElement.src = media.webm ?? media.mp4 ?? '';

      videoTexture = new THREE.VideoTexture(videoElement);
      videoTexture.colorSpace = THREE.SRGBColorSpace;
      clearTexture();
      currentTexture.current = videoTexture;
      setResult({ texture: videoTexture, mode: 'video', ready: true, error: null });

      videoElement.play().catch(() => {
        if (!disposed) loadPoster();
      });
    } else if (isActive || isNearActive) {
      loadPoster();
    } else {
      setResult({ texture: null, mode: 'procedural', ready: true, error: null });
    }

    return () => {
      disposed = true;
      if (videoElement) {
        videoElement.pause();
        videoElement.removeAttribute('src');
        videoElement.load();
      }
      videoTexture?.dispose();
      if (currentTexture.current === videoTexture) {
        currentTexture.current = null;
      }
    };
  }, [allowVideo, isActive, isNearActive, loader, media.mp4, media.poster, media.webm, quality]);

  return result;
}
