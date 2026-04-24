import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import type { FeaturedWorldMedia, QualityLevel } from '../types/world';

interface UseMediaTextureArgs {
  media: FeaturedWorldMedia;
  allowVideo: boolean;
  active: boolean;
  quality: QualityLevel;
}

interface UseMediaTextureResult {
  texture: THREE.Texture | null;
  mode: 'video' | 'poster' | 'procedural';
  ready: boolean;
  error: string | null;
}

export function useMediaTexture({ media, allowVideo, active }: UseMediaTextureArgs): UseMediaTextureResult {
  const [result, setResult] = useState<UseMediaTextureResult>({ texture: null, mode: 'procedural', ready: false, error: null });
  const loader = useMemo(() => new THREE.TextureLoader(), []);

  useEffect(() => {
    let disposed = false;
    let video: HTMLVideoElement | null = null;
    let tex: THREE.Texture | null = null;

    const loadPoster = () => {
      if (!media.poster) {
        setResult({ texture: null, mode: 'procedural', ready: true, error: null });
        return;
      }
      loader.load(
        media.poster,
        (loaded) => {
          if (disposed) return;
          loaded.colorSpace = THREE.SRGBColorSpace;
          tex = loaded;
          setResult({ texture: loaded, mode: 'poster', ready: true, error: null });
        },
        undefined,
        () => setResult({ texture: null, mode: 'procedural', ready: true, error: 'poster' }),
      );
    };

    if (allowVideo && (media.webm || media.mp4)) {
      video = document.createElement('video');
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.src = media.webm ?? media.mp4 ?? '';
      if (active) {
        video.play().catch(() => loadPoster());
      }
      tex = new THREE.VideoTexture(video);
      tex.colorSpace = THREE.SRGBColorSpace;
      setResult({ texture: tex, mode: 'video', ready: true, error: null });
    } else {
      loadPoster();
    }

    return () => {
      disposed = true;
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
      tex?.dispose();
    };
  }, [active, allowVideo, loader, media.mp4, media.poster, media.webm]);

  return result;
}
