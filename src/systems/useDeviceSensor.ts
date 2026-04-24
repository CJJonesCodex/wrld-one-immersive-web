import { useCallback, useEffect, useState } from 'react';

interface SensorVector {
  x: number;
  y: number;
}

interface OrientationPermissionDeviceOrientationEvent extends DeviceOrientationEvent {
  constructor: {
    requestPermission?: () => Promise<'granted' | 'denied'>;
  };
}

export function useDeviceSensor() {
  const [enabled, setEnabled] = useState(false);
  const [available, setAvailable] = useState(false);
  const [permissionState, setPermissionState] = useState<'idle' | 'granted' | 'denied'>('idle');
  const [vector, setVector] = useState<SensorVector>({ x: 0, y: 0 });

  useEffect(() => {
    setAvailable(typeof window !== 'undefined' && 'DeviceOrientationEvent' in window);
  }, []);

  useEffect(() => {
    if (!enabled || !available) return;

    const onOrientation = (event: DeviceOrientationEvent) => {
      const x = (event.gamma ?? 0) / 45;
      const y = (event.beta ?? 0) / 90;
      setVector({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    };

    window.addEventListener('deviceorientation', onOrientation, true);
    return () => window.removeEventListener('deviceorientation', onOrientation, true);
  }, [enabled, available]);

  const toggle = useCallback(async () => {
    if (!available) {
      setEnabled(false);
      setPermissionState('denied');
      return;
    }

    const eventType = window.DeviceOrientationEvent as unknown as OrientationPermissionDeviceOrientationEvent['constructor'];
    if (typeof eventType.requestPermission === 'function') {
      const response = await eventType.requestPermission();
      if (response !== 'granted') {
        setEnabled(false);
        setPermissionState('denied');
        return;
      }
    }

    setPermissionState('granted');
    setEnabled((prev) => !prev);
  }, [available]);

  return {
    enabled,
    available,
    permissionState,
    vector,
    toggle,
  };
}
