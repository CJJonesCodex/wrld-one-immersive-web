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
        new Vector3(0, 1.75, 11),
        new Vector3(0.5, 2.0, -22),
        new Vector3(1.2, 2.3, -58),
        new Vector3(-1.4, 2.35, -99),
        new Vector3(1.1, 2.2, -138),
        new Vector3(-1.0, 2.35, -172),
        new Vector3(0.2, 2.0, -207),
      ]),
    [],
  );

  const lookCurve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(0, 1.9, -10),
        new Vector3(0.1, 2.1, -40),
        new Vector3(-0.4, 2.2, -80),
        new Vector3(0.6, 2.35, -120),
        new Vector3(-0.2, 2.25, -164),
        new Vector3(0, 2.15, -212),
      ]),
    [],
  );

  useFrame((_, delta) => {
    const mixedX = pointer.x * 0.76 + sensorOffset.x * 0.24;
    const mixedY = pointer.y * 0.76 + sensorOffset.y * 0.24;
    blendedPointer.current.lerp(new Vector2(mixedX, mixedY), 1 - Math.exp(-delta * 2.6));

    const path = MathUtils.clamp(progress, 0, 1);
    const curvePos = cameraCurve.getPoint(path);
    const lookPos = lookCurve.getPoint(path);
    const drift = Math.sin(path * Math.PI * 6) * 0.08;

    const target = new Vector3(
      curvePos.x + blendedPointer.current.x * 0.24 + drift,
      curvePos.y + blendedPointer.current.y * 0.18,
      curvePos.z,
    );

    camera.position.lerp(target, 1 - Math.exp(-delta * 2.4));
    camera.lookAt(lookPos.x + blendedPointer.current.x * 0.11, lookPos.y + blendedPointer.current.y * 0.08, lookPos.z);
  });

  return null;
}
