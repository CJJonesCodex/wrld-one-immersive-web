import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { FeaturedWorld } from '../types/world';
import type { PointerIntent } from '../systems/usePointerIntent';
import type { DeviceSensorState } from '../systems/useDeviceSensor';

interface CameraRigProps {
  progress: number;
  pointer: PointerIntent;
  sensor: DeviceSensorState;
  activeWorld: FeaturedWorld;
  reducedMotion: boolean;
}

const CAMERA_POINTS = [
  { t: 0.0, position: [0, 1.25, 9.8], lookAt: [0, 0.8, 0] },
  { t: 0.1, position: [0.25, 1.05, 7.4], lookAt: [0, 0.65, -1.2] },
  { t: 0.2, position: [-1.6, 1.05, 4.6], lookAt: [0.15, 0.55, -2.5] },
  { t: 0.34, position: [-1.2, 0.95, 2.0], lookAt: [-1.2, 0.7, -2.2] },
  { t: 0.48, position: [1.35, 0.82, -0.7], lookAt: [1.15, 0.45, -4.3] },
  { t: 0.62, position: [-1.05, 0.88, -3.8], lookAt: [-0.9, 0.28, -6.4] },
  { t: 0.76, position: [0.8, 0.72, -6.8], lookAt: [-0.15, 0.35, -8.3] },
  { t: 0.88, position: [0.15, 0.92, -10.8], lookAt: [0, 0.55, -12.4] },
  { t: 1.0, position: [0, 1.1, -14.4], lookAt: [0, 0.65, -18.0] },
] as const;

export function CameraRig({ progress, pointer, sensor, reducedMotion }: CameraRigProps) {
  const { camera, size } = useThree();
  const currentPosition = useRef(new THREE.Vector3(0, 1.25, 9.8));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.8, 0));

  const path = useMemo(
    () => ({
      pos: new THREE.CatmullRomCurve3(CAMERA_POINTS.map((p) => new THREE.Vector3(...p.position))),
      look: new THREE.CatmullRomCurve3(CAMERA_POINTS.map((p) => new THREE.Vector3(...p.lookAt))),
    }),
    [],
  );

  useFrame((_, delta) => {
    const basePos = path.pos.getPoint(Math.min(1, Math.max(0, progress)));
    const baseLook = path.look.getPoint(Math.min(1, Math.max(0, progress)));
    const px = pointer.isTouch ? pointer.smoothX * 0.14 : pointer.smoothX * 0.18;
    const py = pointer.isTouch ? pointer.smoothY * 0.08 : pointer.smoothY * 0.1;
    const sx = sensor.enabled ? sensor.tiltX * 0.16 : 0;
    const sy = sensor.enabled ? sensor.tiltY * 0.08 : 0;

    const damp = reducedMotion ? 12 : 4.5;
    currentPosition.current.x = THREE.MathUtils.damp(currentPosition.current.x, basePos.x + px + sx, damp, delta);
    currentPosition.current.y = THREE.MathUtils.damp(currentPosition.current.y, basePos.y + py + sy, damp, delta);
    currentPosition.current.z = THREE.MathUtils.damp(currentPosition.current.z, basePos.z, damp, delta);

    currentLookAt.current.lerp(baseLook, reducedMotion ? 0.2 : 0.08);

    camera.position.copy(currentPosition.current);
    const nextFov = size.width < 821 ? 46 : 42;
    if (camera instanceof THREE.PerspectiveCamera && camera.fov !== nextFov) {
      camera.fov = Math.min(50, nextFov);
      camera.updateProjectionMatrix();
    }
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
