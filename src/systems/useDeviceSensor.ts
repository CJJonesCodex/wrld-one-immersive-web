import { useCallback, useEffect, useRef, useState } from 'react';
import { clamp01 } from '../utils/math';

export type SensorPermissionState = 'idle' | 'requesting' | 'granted' | 'denied' | 'unsupported';

export interface DeviceSensorState {
  status: SensorPermissionState;
  enabled: boolean;
  tiltX: number;
  tiltY: number;
  request: () => Promise<void>;
  disable: () => void;
}

type DeviceOrientationWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>;
};

export function useDeviceSensor(): DeviceSensorState {
  const [status, setStatus] = useState<SensorPermissionState>('idle');
  const [enabled, setEnabled] = useState(false);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const smooth = useRef({ x: 0, y: 0 });

  const disable = useCallback(() => {
    if (typeof window !== 'undefined') window.removeEventListener('deviceorientation', onOrientation as EventListener);
    setEnabled(false);
    setStatus((prev) => (prev === 'unsupported' ? prev : 'idle'));
    setTiltX(0);
    setTiltY(0);
  }, []);

  function onOrientation(event: DeviceOrientationEvent): void {
    const gamma = event.gamma ?? 0;
    const beta = event.beta ?? 0;
    const nx = clamp01((gamma + 45) / 90) * 2 - 1;
    const ny = clamp01((beta + 45) / 90) * 2 - 1;
    smooth.current.x += (nx - smooth.current.x) * 0.1;
    smooth.current.y += (ny - smooth.current.y) * 0.1;
    setTiltX(smooth.current.x);
    setTiltY(smooth.current.y);
  }

  const request = useCallback(async () => {
    if (typeof window === 'undefined' || typeof DeviceOrientationEvent === 'undefined') {
      setStatus('unsupported');
      return;
    }

    const DOE = DeviceOrientationEvent as DeviceOrientationWithPermission;
    setStatus('requesting');
    try {
      if (typeof DOE.requestPermission === 'function') {
        const permission = await DOE.requestPermission();
        if (permission !== 'granted') {
          setStatus('denied');
          return;
        }
      }
      window.addEventListener('deviceorientation', onOrientation as EventListener, { passive: true });
      setEnabled(true);
      setStatus('granted');
    } catch {
      setStatus('denied');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof DeviceOrientationEvent === 'undefined') {
      setStatus('unsupported');
    }
    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('deviceorientation', onOrientation as EventListener);
    };
  }, []);

  return { status, enabled, tiltX, tiltY, request, disable };
}
