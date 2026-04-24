interface AudioVisualizerProps {
  enabled: boolean;
  accent: string;
}

export function AudioVisualizer({ enabled, accent }: AudioVisualizerProps) {
  if (!enabled) return null;
  return (
    <div className="audio-visualizer" style={{ ['--accent' as string]: accent }}>
      <span>SOUND FIELD</span>
      <div className="audio-visualizer__bars">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="audio-visualizer__bar" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </div>
    </div>
  );
}
