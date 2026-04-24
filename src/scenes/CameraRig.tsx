import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { CatmullRomCurve3, MathUtils, Vector2, Vector3 } from 'three';

interface CameraRigProps {
  progress: number;
}

export function CameraRig({ progress }: CameraRigProps) {
  const { camera, pointer } = useThree();
  const keyboardOffset = useRef(0);
  const pointerTarget = useRef(new Vector2(0, 0));

  const cameraCurve = useMemo(
    () =>
      new CatmullRomCurve3(
        [
          new Vector3(0, 1.8, 9),
          new Vector3(0, 2.3, -8),
          new Vector3(2.8, 2.5, -56),
          new Vector3(-2.9, 2.9, -106),
          new Vector3(0, 2.4, -183),
        ],
        false,
        'catmullrom',
        0.35,
      ),
    [],
  );

  const lookCurve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(0, 1.8, -14),
        new Vector3(0.8, 2.2, -48),
        new Vector3(-1.5, 2.5, -98),
        new Vector3(0, 2.7, -165),
        new Vector3(0, 2.2, -205),
      ]),
    [],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'w' || event.key === 'ArrowUp') {
        keyboardOffset.current = MathUtils.clamp(keyboardOffset.current - 0.8, -5, 5);
      }
      if (event.key === 's' || event.key === 'ArrowDown') {
        keyboardOffset.current = MathUtils.clamp(keyboardOffset.current + 0.8, -5, 5);
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      const t = event.touches[0];
      if (!t) return;
      pointerTarget.current.set((t.clientX / window.innerWidth) * 2 - 1, -(t.clientY / window.innerHeight) * 2 + 1);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  useFrame((_, delta) => {
    pointerTarget.current.lerp(pointer, 1 - Math.exp(-delta * 2.7));

    const curvePos = cameraCurve.getPoint(MathUtils.clamp(progress, 0, 1));
    const lookPos = lookCurve.getPoint(MathUtils.clamp(progress, 0, 1));

    const parallaxX = pointerTarget.current.x * 0.55;
    const parallaxY = pointerTarget.current.y * 0.28;

    const target = new Vector3(curvePos.x + parallaxX, curvePos.y + parallaxY, curvePos.z + keyboardOffset.current);
    camera.position.lerp(target, 1 - Math.exp(-delta * 2.4));

    const lookTarget = new Vector3(lookPos.x + parallaxX * 0.4, lookPos.y + parallaxY * 0.25, lookPos.z + keyboardOffset.current * 0.85);
    camera.lookAt(lookTarget);
  });

  return null;
}
