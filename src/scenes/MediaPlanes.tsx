import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial, SRGBColorSpace, Texture, TextureLoader, VideoTexture } from 'three';
import { mediaManifest, type MediaSlot } from '../data/mediaManifest';
import type { QualityConfig } from '../systems/useQuality';

interface MediaPlanesProps {
  quality: QualityConfig;
}

interface MediaPlaneAnchor {
  position: [number, number, number];
  rotationY: number;
}

const anchors: Record<string, MediaPlaneAnchor> = {
  'ZONE-01': { position: [0, 2.8, -11], rotationY: 0 },
  'ZONE-02': { position: [3.6, 2.8, -56], rotationY: -0.45 },
  'ZONE-03': { position: [-3.5, 2.9, -105], rotationY: 0.4 },
  'ZONE-04': { position: [0, 3.1, -164], rotationY: 0 },
};

function useMediaTexture(slot: MediaSlot, quality: QualityConfig) {
  const [map, setMap] = useState<Texture | null>(null);

  useEffect(() => {
    let disposed = false;
    let videoEl: HTMLVideoElement | null = null;
    let currentTexture: Texture | null = null;

    const cleanup = () => {
      if (currentTexture) {
        currentTexture.dispose();
      }
      if (videoEl) {
        videoEl.pause();
        videoEl.src = '';
        videoEl.load();
      }
    };

    const loadPoster = () => {
      const loader = new TextureLoader();
      loader.load(
        slot.poster,
        (texture) => {
          if (disposed) {
            texture.dispose();
            return;
          }
          texture.colorSpace = SRGBColorSpace;
          currentTexture = texture;
          setMap(texture);
        },
        undefined,
        () => {
          if (!disposed) {
            setMap(null);
          }
        },
      );
    };

    const loadVideo = () => {
      videoEl = document.createElement('video');
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.preload = 'metadata';
      videoEl.crossOrigin = 'anonymous';
      videoEl.src = slot.webm;

      const playVideo = () => {
        if (!videoEl) return;
        void videoEl.play().catch(() => {
          const onInteract = () => {
            if (!videoEl) return;
            void videoEl.play();
            window.removeEventListener('pointerdown', onInteract);
            window.removeEventListener('keydown', onInteract);
          };
          window.addEventListener('pointerdown', onInteract, { once: true });
          window.addEventListener('keydown', onInteract, { once: true });
        });
      };

      videoEl.addEventListener('canplay', () => {
        if (!videoEl || disposed) return;
        const texture = new VideoTexture(videoEl);
        texture.colorSpace = SRGBColorSpace;
        currentTexture = texture;
        setMap(texture);
        if (quality.enableVideo) {
          playVideo();
        }
      });

      videoEl.addEventListener('error', () => {
        if (!videoEl || disposed) return;
        if (videoEl.src.endsWith('.webm')) {
          videoEl.src = slot.mp4;
          videoEl.load();
        } else {
          loadPoster();
        }
      });

      videoEl.load();
    };

    loadVideo();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [slot, quality.enableVideo]);

  return map;
}

function ProceduralScreen({ intensity }: { intensity: number }) {
  const materialRef = useRef<MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = (0.7 + Math.sin(t * 1.8) * 0.2) * intensity;
      materialRef.current.color.setHSL(0.6 + Math.sin(t * 0.3) * 0.03, 0.7, 0.45);
      materialRef.current.emissive.setHSL(0.57 + Math.sin(t * 0.25) * 0.05, 0.9, 0.3);
    }
  });

  return (
    <>
      <mesh>
        <planeGeometry args={[4.6, 2.6]} />
        <meshStandardMaterial ref={materialRef} color="#2e6fbd" emissive="#3f5cd1" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[4.7, 2.7]} />
        <meshBasicMaterial color="#9de8ff" wireframe transparent opacity={0.32} />
      </mesh>
    </>
  );
}

function MediaPlane({ slot, quality }: { slot: MediaSlot; quality: QualityConfig }) {
  const map = useMediaTexture(slot, quality);
  const anchor = anchors[slot.zoneId];
  const frameRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (frameRef.current) {
      frameRef.current.position.y = anchor.position[1] + Math.sin(clock.elapsedTime * 0.6) * 0.12;
    }
  });

  if (!anchor) return null;

  return (
    <group position={anchor.position} rotation-y={anchor.rotationY}>
      <mesh ref={frameRef}>
        <boxGeometry args={[5.2, 3.2, 0.2]} />
        <meshStandardMaterial color="#0f1b2f" emissive="#265e88" emissiveIntensity={0.65 * quality.glowIntensity} />
      </mesh>
      <group position={[0, 0, 0.13]}>
        {map ? (
          <mesh>
            <planeGeometry args={[4.6, 2.6]} />
            <meshStandardMaterial map={map} emissive="#6086d9" emissiveIntensity={0.2 * quality.glowIntensity} />
          </mesh>
        ) : (
          <ProceduralScreen intensity={quality.glowIntensity} />
        )}
      </group>
    </group>
  );
}

export function MediaPlanes({ quality }: MediaPlanesProps) {
  const slots = useMemo(() => mediaManifest, []);
  return (
    <group>
      {slots.map((slot) => (
        <MediaPlane key={slot.id} slot={slot} quality={quality} />
      ))}
    </group>
  );
}
