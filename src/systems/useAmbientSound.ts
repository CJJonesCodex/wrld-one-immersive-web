import { useCallback, useEffect, useRef, useState } from 'react';

export function useAmbientSound() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscARef = useRef<OscillatorNode | null>(null);
  const oscBRef = useRef<OscillatorNode | null>(null);

  const init = useCallback(async () => {
    if (contextRef.current) {
      if (contextRef.current.state === 'suspended') {
        await contextRef.current.resume();
      }
      return;
    }

    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    const gain = ctx.createGain();
    gain.gain.value = 0;

    const oscA = ctx.createOscillator();
    oscA.type = 'sine';
    oscA.frequency.value = 46;

    const oscB = ctx.createOscillator();
    oscB.type = 'triangle';
    oscB.frequency.value = 82;

    oscA.connect(gain);
    oscB.connect(gain);
    gain.connect(analyser);
    analyser.connect(ctx.destination);

    oscA.start();
    oscB.start();

    contextRef.current = ctx;
    analyserRef.current = analyser;
    gainRef.current = gain;
    oscARef.current = oscA;
    oscBRef.current = oscB;
    setReady(true);
  }, []);

  const toggle = useCallback(async () => {
    await init();
    setEnabled((prev) => {
      const next = !prev;
      const gain = gainRef.current;
      const ctx = contextRef.current;
      if (gain && ctx) {
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.linearRampToValueAtTime(next ? 0.045 : 0, ctx.currentTime + 0.45);
      }
      return next;
    });
  }, [init]);

  useEffect(() => {
    return () => {
      oscARef.current?.stop();
      oscBRef.current?.stop();
      contextRef.current?.close();
    };
  }, []);

  return { enabled, ready, analyser: analyserRef.current, toggle };
}
