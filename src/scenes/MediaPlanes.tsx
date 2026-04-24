import { useEffect, useMemo, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
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
  'ZONE-03': { position: [-2.25, 3.1, -103.4], rotationY: 0.55 },
  'ZONE-04': { position: [0, 3.1, -164], rotationY: 0 },
};

function useMediaTexture(slot: MediaSlot, quality: QualityConfig) {
  const [map, setMap] = useState<Texture | null>(null);
  const [requiresActivation, setRequiresActivation] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activate = () => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().then(() => {
      setRequiresActivation(false);
    }).catch(() => {
      setRequiresActivation(true);
    });
  };

  useEffect(() => {
    let disposed = false;
    let videoEl: HTMLVideoElement | null = null;
    let currentTexture: Texture | null = null;
    let switchedToMp4 = false;

    setRequiresActivation(false);
    setMap(null);

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
      if (!quality.enableVideo) {
        loadPoster();
        return;
      }

      videoEl = document.createElement('video');
      videoRef.current = videoEl;
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.preload = 'metadata';
      videoEl.crossOrigin = 'anonymous';
      videoEl.src = slot.webm;
      videoEl.defaultMuted = true;
      videoEl.setAttribute('muted', 'true');
      videoEl.setAttribute('playsinline', 'true');

      const playVideo = () => {
        if (!videoEl) return;
        void videoEl.play()
          .then(() => {
            if (!disposed) setRequiresActivation(false);
          })
          .catch(() => {
            if (!disposed) setRequiresActivation(true);
          });
      };

      videoEl.addEventListener('canplay', () => {
        if (!videoEl || disposed) return;
        if (currentTexture) return;
        const texture = new VideoTexture(videoEl);
        texture.colorSpace = SRGBColorSpace;
        currentTexture = texture;
        setMap(texture);
        playVideo();
      });

      videoEl.addEventListener('error', () => {
        if (!videoEl || disposed) return;
        if (!switchedToMp4) {
          switchedToMp4 = true;
          videoEl.src = slot.mp4;
          videoEl.load();
        } else {
          videoRef.current = null;
          loadPoster();
        }
      });

      videoEl.load();
    };

    loadVideo();

    return () => {
      disposed = true;
      videoRef.current = null;
      cleanup();
    };
  }, [slot, quality.enableVideo]);

  return { map, requiresActivation, activate };
}

function ProceduralScreen({ intensity, width, height }: { intensity: number; width: number; height: number }) {
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
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial ref={materialRef} color="#2e6fbd" emissive="#3f5cd1" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width + 0.1, height + 0.1]} />
        <meshBasicMaterial color="#9de8ff" wireframe transparent opacity={0.32} />
      </mesh>
    </>
  );
}

function MediaPlane({ slot, quality }: { slot: MediaSlot; quality: QualityConfig }) {
  const { map, requiresActivation, activate } = useMediaTexture(slot, quality);
  const anchor = anchors[slot.zoneId];
  const frameRef = useRef<Mesh>(null);
  const contentRef = useRef<Mesh>(null);
  const isCore = slot.id === 'core-loop';

  const baseHeight = 3;
  const maxWidth = 4.6;
  const safeRatio = slot.aspectRatio > 0 ? slot.aspectRatio : 16 / 9;
  const contentHeight = safeRatio >= 1 ? Math.min(baseHeight, maxWidth / safeRatio) : baseHeight;
  const contentWidth = contentHeight * safeRatio;
  const framePadding = isCore ? 0.55 : 0.32;
  const frameWidth = contentWidth + framePadding;
  const frameHeight = contentHeight + framePadding;

  useFrame(({ clock }) => {
    if (frameRef.current) {
      frameRef.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.12;
      if (isCore) {
        frameRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.22) * 0.05;
      }
    }
    if (contentRef.current && isCore) {
      contentRef.current.position.z = 0.16 + Math.sin(clock.elapsedTime * 0.8) * 0.015;
    }
  });

  if (!anchor) return null;

  return (
    <group position={anchor.position} rotation-y={anchor.rotationY}>
      <mesh ref={frameRef}>
        <boxGeometry args={[frameWidth, frameHeight, isCore ? 0.28 : 0.2]} />
        <meshStandardMaterial
          color={isCore ? '#10172a' : '#0f1b2f'}
          emissive={isCore ? '#3f8fd8' : '#265e88'}
          emissiveIntensity={(isCore ? 0.95 : 0.65) * quality.glowIntensity}
          metalness={isCore ? 0.5 : 0.2}
          roughness={isCore ? 0.25 : 0.5}
        />
      </mesh>
      {isCore ? (
        <mesh position={[0, 0, -0.06]}>
          <planeGeometry args={[frameWidth + 0.25, frameHeight + 0.25]} />
          <meshBasicMaterial color="#69d0ff" transparent opacity={0.18 * quality.glowIntensity} />
        </mesh>
      ) : null}
      <group ref={contentRef} position={[0, 0, isCore ? 0.16 : 0.13]}>
        {map ? (
          <mesh>
            <planeGeometry args={[contentWidth, contentHeight]} />
            <meshStandardMaterial map={map} emissive="#6086d9" emissiveIntensity={0.2 * quality.glowIntensity} />
          </mesh>
        ) : (
          <ProceduralScreen intensity={quality.glowIntensity} width={contentWidth} height={contentHeight} />
        )}
        {requiresActivation ? (
          <Html center distanceFactor={9} position={[0, -contentHeight / 2 - 0.28, 0.02]}>
            <button className="media-activate" type="button" onClick={activate}>
              Tap to activate media
            </button>
          </Html>
        ) : null}
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
