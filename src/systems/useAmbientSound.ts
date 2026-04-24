import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface AmbientSoundState {
  enabled: boolean;
  supported: boolean;
  toggle: () => Promise<void>;
  start: () => Promise<void>;
  stop: () => void;
}

export function useAmbientSound(): AmbientSoundState {
  const supported = useMemo(() => typeof window !== 'undefined' && !!window.AudioContext, []);
  const [enabled, setEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscARef = useRef<OscillatorNode | null>(null);
  const oscBRef = useRef<OscillatorNode | null>(null);

  const stop = useCallback(() => {
    const ctx = audioContextRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.linearRampToValueAtTime(0.0001, now + 0.6);
    setEnabled(false);
  }, []);

  const start = useCallback(async () => {
    if (!supported) return;
    if (!audioContextRef.current) {
      const ctx = new window.AudioContext();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 480;
      gain.gain.value = 0.0001;
      gain.connect(filter);
      filter.connect(ctx.destination);

      const oscA = ctx.createOscillator();
      oscA.type = 'sine';
      oscA.frequency.value = 74;
      oscA.connect(gain);
      oscA.start();

      const oscB = ctx.createOscillator();
      oscB.type = 'sine';
      oscB.frequency.value = 111;
      oscB.connect(gain);
      oscB.start();

      audioContextRef.current = ctx;
      gainRef.current = gain;
      oscARef.current = oscA;
      oscBRef.current = oscB;
    }

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    const now = audioContextRef.current.currentTime;
    gainRef.current?.gain.cancelScheduledValues(now);
    gainRef.current?.gain.linearRampToValueAtTime(0.022, now + 1.2);
    setEnabled(true);
  }, [supported]);

  const toggle = useCallback(async () => {
    if (enabled) stop();
    else await start();
  }, [enabled, start, stop]);

  useEffect(
    () => () => {
      stop();
      oscARef.current?.stop();
      oscBRef.current?.stop();
      oscARef.current?.disconnect();
      oscBRef.current?.disconnect();
      gainRef.current?.disconnect();
      audioContextRef.current?.close();
    },
    [stop],
  );

  return { enabled, supported, toggle, start, stop };
}
