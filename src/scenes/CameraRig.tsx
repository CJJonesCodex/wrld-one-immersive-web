import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { MathUtils, Vector2 } from 'three';

interface CameraRigProps {
  progress: number;
}

export function CameraRig({ progress }: CameraRigProps) {
  const { camera, pointer } = useThree();
  const keyboardOffset = useRef(0);
  const pointerTarget = useRef(new Vector2(0, 0));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'w' || event.key === 'ArrowUp') {
        keyboardOffset.current = MathUtils.clamp(keyboardOffset.current - 0.7, -4, 4);
      }
      if (event.key === 's' || event.key === 'ArrowDown') {
        keyboardOffset.current = MathUtils.clamp(keyboardOffset.current + 0.7, -4, 4);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useFrame((_, delta) => {
    pointerTarget.current.lerp(pointer, 1 - Math.exp(-delta * 3));

    const targetZ = MathUtils.lerp(8, -180, progress) + keyboardOffset.current;
    const targetX = pointerTarget.current.x * 1.2;
    const targetY = 1.8 + pointerTarget.current.y * 0.6;

    camera.position.x = MathUtils.lerp(camera.position.x, targetX, 0.06);
    camera.position.y = MathUtils.lerp(camera.position.y, targetY, 0.06);
    camera.position.z = MathUtils.lerp(camera.position.z, targetZ, 0.08);
    camera.lookAt(targetX * 0.2, 1.1 + pointerTarget.current.y * 0.25, targetZ - 10);
  });

  return null;
}
