interface LoadingScreenProps {
  visible: boolean;
  progress: number;
}

export function LoadingScreen({ visible, progress }: LoadingScreenProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-panel">
        <p className="loading-title">Initializing WRLD ONE GATE</p>
        <div className="loading-bar">
          <span style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} />
        </div>
        <p className="loading-value">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
