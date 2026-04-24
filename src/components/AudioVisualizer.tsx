import { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  analyser: AnalyserNode | null;
  visible: boolean;
}

export function AudioVisualizer({ analyser, visible }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!analyser || !visible) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !canvasRef.current) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    let raf = 0;

    const draw = () => {
      analyser.getByteFrequencyData(data);
      const { width, height } = canvasRef.current as HTMLCanvasElement;
      ctx.clearRect(0, 0, width, height);
      const bars = 18;
      for (let i = 0; i < bars; i += 1) {
        const value = data[i] / 255;
        const barHeight = Math.max(2, value * height);
        const x = i * (width / bars);
        ctx.fillStyle = i % 3 === 0 ? 'rgba(180, 199, 214, 0.9)' : 'rgba(126, 151, 170, 0.65)';
        ctx.fillRect(x, height - barHeight, 2, barHeight);
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
