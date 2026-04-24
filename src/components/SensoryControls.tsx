import type { AmbientSoundState } from '../systems/useAmbientSound';
import type { DeviceSensorState } from '../systems/useDeviceSensor';
import type { HapticsState } from '../systems/useHaptics';

interface SensoryControlsProps {
  sound: AmbientSoundState;
  haptics: HapticsState;
  sensor: DeviceSensorState;
  activeAccent: string;
  compact?: boolean;
}

export function SensoryControls({ sound, haptics, sensor, activeAccent, compact = false }: SensoryControlsProps) {
  const buttonStyle = { ['--accent' as string]: activeAccent };
  return (
    <div className={`sensory-controls ${compact ? 'is-compact' : ''}`}>
      <button className={`sensory-button ${sound.enabled ? 'is-active' : ''}`} style={buttonStyle} onClick={async () => { await sound.toggle(); if (haptics.enabled) haptics.pulse(8); }} aria-label="Toggle sound">
        Sound {sound.enabled ? 'ON' : 'OFF'}
      </button>
      <button className={`sensory-button ${haptics.enabled ? 'is-active' : ''}`} style={buttonStyle} onClick={() => { haptics.toggle(); if (haptics.supported) haptics.pulse(12); }} aria-label="Toggle haptics">
        Haptic {haptics.enabled ? 'ON' : 'OFF'}
      </button>
      <button
        className={`sensory-button ${sensor.enabled ? 'is-active' : ''}`}
        style={buttonStyle}
        onClick={async () => {
          if (sensor.enabled) sensor.disable();
          else await sensor.request();
          if (haptics.enabled) haptics.pulse(10);
        }}
        aria-label="Toggle 3D sensor"
      >
        {sensor.status === 'requesting' ? 'SENSOR ...' : `3D Sensor ${sensor.enabled ? 'ON' : 'OFF'}`}
      </button>
    </div>
  );
}
