import { useEffect, useMemo, useRef, useState } from 'react';
import { Texture, TextureLoader, VideoTexture, SRGBColorSpace } from 'three';
import { featuredWorlds } from '../data/featuredWorlds';
import type { QualityConfig } from '../systems/useQuality';
import { PremiumGlassCard } from './PremiumGlassCard';

interface FeaturedWorldRailProps {
  progress: number;
  activeIndex: number;
  quality: QualityConfig;
  soundReactive: boolean;
  onSelectWorld: (index: number) => void;
}

function useWorldMedia(index: number, activeIndex: number, quality: QualityConfig) {
  const world = featuredWorlds[index];
  const [texture, setTexture] = useState<Texture | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let disposed = false;
    let localTexture: Texture | null = null;
    const activeDistance = Math.abs(index - activeIndex);
    const canUseVideo = quality.enableVideo && activeDistance <= 1 && !!world.webm;

    const cleanup = () => {
      if (localTexture) localTexture.dispose();
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
      videoRef.current = null;
    };

    const loadPoster = () => {
      const loader = new TextureLoader();
      loader.load(
        world.poster,
        (loaded) => {
          if (disposed) {
            loaded.dispose();
            return;
          }
          loaded.colorSpace = SRGBColorSpace;
          localTexture = loaded;
          setTexture(loaded);
        },
        undefined,
        () => {
          if (!disposed) setTexture(null);
        },
      );
    };

    if (!canUseVideo) {
      loadPoster();
    } else {
      const video = document.createElement('video');
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.crossOrigin = 'anonymous';
      video.src = world.webm ?? world.mp4 ?? '';
      videoRef.current = video;

      video.oncanplay = () => {
        if (disposed) return;
        const vt = new VideoTexture(video);
        vt.colorSpace = SRGBColorSpace;
        localTexture = vt;
        setTexture(vt);
        void video.play().catch(() => {
          loadPoster();
        });
      };

      video.onerror = () => {
        loadPoster();
      };

      video.load();
    }

    return () => {
      disposed = true;
      cleanup();
    };
  }, [activeIndex, index, quality.enableVideo, world.mp4, world.poster, world.webm]);

  return texture;
}

function WorldCard({
  index,
  activeIndex,
  progress,
  quality,
  onSelect,
}: {
  index: number;
  activeIndex: number;
  progress: number;
  quality: QualityConfig;
  onSelect: () => void;
}) {
  const world = featuredWorlds[index];
  const texture = useWorldMedia(index, activeIndex, quality);
  const zOffset = (progress * (featuredWorlds.length - 1) - index) * 7.5;

  return (
    <PremiumGlassCard
      world={world}
      isActive={activeIndex === index}
      media={texture}
      onSelect={onSelect}
      zOffset={zOffset}
    />
  );
}

export function FeaturedWorldRail({ progress, activeIndex, quality, onSelectWorld }: FeaturedWorldRailProps) {
  const cards = useMemo(() => featuredWorlds, []);

  return (
    <group>
      {cards.map((_, index) => (
        <WorldCard
          key={cards[index].id}
          index={index}
          activeIndex={activeIndex}
          progress={progress}
          quality={quality}
          onSelect={() => onSelectWorld(index)}
        />
      ))}
    </group>
  );
}
