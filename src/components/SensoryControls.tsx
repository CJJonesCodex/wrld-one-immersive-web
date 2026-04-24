interface SensoryControlsProps {
  soundOn: boolean;
  hapticsOn: boolean;
  sensorOn: boolean;
  onToggleSound: () => void;
  onToggleHaptics: () => void;
  onToggleSensor: () => void;
}

export function SensoryControls({
  soundOn,
  hapticsOn,
  sensorOn,
  onToggleSound,
  onToggleHaptics,
  onToggleSensor,
}: SensoryControlsProps) {
  return (
    <div className="sensory-controls" role="group" aria-label="Sensory controls">
      <button type="button" aria-label="Toggle ambient sound" onClick={onToggleSound} data-cursor="interactive">
        Sound {soundOn ? 'ON' : 'OFF'}
      </button>
      <button type="button" aria-label="Toggle haptic feedback" onClick={onToggleHaptics} data-cursor="interactive">
        Haptic {hapticsOn ? 'ON' : 'OFF'}
      </button>
      <button type="button" aria-label="Toggle 3D sensor controls" onClick={onToggleSensor} data-cursor="interactive">
        3D Sensor {sensorOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}
