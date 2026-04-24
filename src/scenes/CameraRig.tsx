import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { CatmullRomCurve3, MathUtils, Vector2, Vector3 } from 'three';

interface CameraRigProps {
  progress: number;
  sensorOffset: { x: number; y: number };
}

export function CameraRig({ progress, sensorOffset }: CameraRigProps) {
  const { camera, pointer } = useThree();
  const blendedPointer = useRef(new Vector2(0, 0));

  const cameraCurve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(0, 1.7, 10),
        new Vector3(0, 1.9, -18),
        new Vector3(1.2, 2.2, -58),
        new Vector3(-1.5, 2.35, -101),
        new Vector3(0.3, 2.2, -148),
        new Vector3(-0.2, 1.8, -188),
      ]),
    [],
  );

  const lookCurve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(0, 1.8, -16),
        new Vector3(0.2, 2, -42),
        new Vector3(-0.6, 2.2, -82),
        new Vector3(0.8, 2.4, -120),
        new Vector3(0.2, 2.1, -180),
      ]),
    [],
  );

  useFrame((_, delta) => {
    const mixedX = pointer.x * 0.7 + sensorOffset.x * 0.3;
    const mixedY = pointer.y * 0.7 + sensorOffset.y * 0.3;
    blendedPointer.current.lerp(new Vector2(mixedX, mixedY), 1 - Math.exp(-delta * 2.4));

    const path = MathUtils.clamp(progress, 0, 1);
    const curvePos = cameraCurve.getPoint(path);
    const lookPos = lookCurve.getPoint(path);

    const target = new Vector3(
      curvePos.x + blendedPointer.current.x * 0.28 + Math.sin(path * Math.PI * 2) * 0.12,
      curvePos.y + blendedPointer.current.y * 0.2,
      curvePos.z,
    );

    camera.position.lerp(target, 1 - Math.exp(-delta * 2.6));
    camera.lookAt(
      lookPos.x + blendedPointer.current.x * 0.13,
      lookPos.y + blendedPointer.current.y * 0.08,
      lookPos.z,
    );
  });

  return null;
}
