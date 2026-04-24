import { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  analyser: AnalyserNode | null;
  visible: boolean;
}

export function AudioVisualizer({ analyser, visible }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!analyser || !visible) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    let raf = 0;

    const draw = () => {
      analyser.getByteFrequencyData(data);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 20;
      for (let i = 0; i < bars; i += 1) {
        const value = data[i] / 255;
        const barHeight = Math.max(2, value * canvas.height);
        const x = i * (canvas.width / bars);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 220, 174, 0.9)' : 'rgba(149, 212, 255, 0.72)';
        ctx.fillRect(x, canvas.height - barHeight, 2, barHeight);
      }
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [analyser, visible]);

  if (!visible) return null;
  return (
    <div className="audio-visualizer" aria-label="Sound visualizer">
      <canvas ref={canvasRef} width={72} height={20} />
    </div>
  );
}
